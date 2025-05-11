<template>
  <div class="add-article">
    <h2>Thêm Bài Viết</h2>
    <form @submit.prevent="submitArticle">
      <div class="form-group flex-container">
        <div class="multi-select">
          <label>Chủ Đề</label>
          <div class="topic-list">
            <div v-for="topic in topics" :key="topic.id" class="checkbox-group">
              <input type="checkbox" :id="'topic-' + topic.id" :value="topic.id" v-model="selectedTopics" />
              <label :for="'topic-' + topic.id">{{ topic.name }}</label>
            </div>
          </div>
        </div>

        <div class="selected-topics">
          <label>Đã chọn</label>
          <div>
            <span v-for="topicId in selectedTopics" :key="topicId" class="selected-topic">
              {{ topics.find(t => t.id === topicId)?.name }}
            </span>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label>Loại Bài Viết</label>
        <div class="type-buttons">
          <button type="button" :class="{ active: article.type === 'baibao' }" @click="setType('baibao')">Bài báo</button>
          <button type="button" :class="{ active: article.type === 'tonghop' }" @click="setType('tonghop')">Tổng hợp kiến thức</button>
        </div>
      </div>

      <div class="form-group">
        <label for="title">Tiêu Đề</label>
        <input type="text" id="title" v-model="article.title" required class="modern-input" />
      </div>

      <div class="form-group">
        <label for="description">Mô Tả</label>
        <textarea id="description" v-model="article.description" class="modern-textarea"></textarea>
      </div>

      <div class="form-group">
        <label for="textData">Nội Dung</label>
        <textarea id="textData" v-model="article.textData" class="modern-textarea"></textarea>
      </div>

      <button type="submit" class="modern-button">Thêm Bài Viết</button>
    </form>

    <p v-if="message" class="success-message">{{ message }}</p>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      article: {
        creatorId: null,
        tag: "",
        title: "",
        description: "",
        textData: "",
        createdDate: new Date().toISOString().split("T")[0],
        topicId: 1,
        type: "baibao",
      },
      selectedTopics: [1],
      topics: [],
      message: "",
      error: "",
    };
  },
  watch: {
    selectedTopics() {
      if (this.article.type === 'tonghop') {
        this.article.tag = this.selectedTopics[this.selectedTopics.length - 1] || "";
      } else {
        this.article.tag = this.selectedTopics.join(";");
      }
    }
  },
  mounted() {
    this.fetchTopics();
  },
  methods: {
    async fetchTopics() {
      try {
        const response = await axios.get("http://localhost:8080/topic");
        this.topics = response.data;
      } catch (error) {
        console.error("Lỗi khi tải danh sách chủ đề", error);
      }
    },
    async setType(type) {
      this.article.type = type;
      this.selectedTopics = [];
      if (type === "baibao") {
        const response = await axios.get("http://localhost:8080/topic");
        this.topics = response.data;
        this.article.topicId = 1;
      } else if (type === "tonghop") {
        const response = await axios.get("http://localhost:8080/topic/oid/31");
        this.topics = response.data;
        this.article.topicId = 30;
      }
    },
    async submitArticle() {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("id");
        this.article.creatorId = userId;
        await axios.post("http://localhost:8080/article", this.article, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        this.message = "Bài viết đã được thêm thành công!";
        this.error = "";
        this.resetForm();
      } catch (err) {
        this.error = "Lỗi khi thêm bài viết. Kiểm tra quyền hoặc dữ liệu nhập vào.";
        this.message = "";
      }
    },
    resetForm() {
      this.article = {
        creatorId: localStorage.getItem("id"),
        tag: "",
        title: "",
        description: "",
        textData: "",
        createdDate: new Date().toISOString().split("T")[0],
        type: "",
        topicId: 30,
      };
      this.selectedTopics = [];
    },
  },
};
</script>

<style scoped>
.add-article {
  max-width: 700px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
  margin-right: 20px;
}

.flex-container {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.multi-select {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 5px;
}

.selected-topics {
  flex: 1;
}

.selected-topic {
  display: inline-block;
  background: #066506;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  margin: 2px;
  font-size: 14px;
}

.type-buttons {
  display: flex;
  gap: 10px;
}

.type-buttons button {
  flex: 1;
  padding: 10px;
  border: 1px solid #066506;
  background: white;
  color: #066506;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

.type-buttons button.active,
.type-buttons button:hover {
  background: #066506;
  color: white;
}

.modern-input, .modern-textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.modern-input:focus, .modern-textarea:focus {
  border-color: #066506;
  outline: none;
}

.modern-button {
  display: block;
  width: 100%;
  padding: 12px;
  background: #066506;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
}

.modern-button:hover {
  background: #044604;
}

.success-message {
  color: green;
  text-align: center;
  margin-top: 10px;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>
