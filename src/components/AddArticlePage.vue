<template>
  <div class="add-article">
    <h2>Thêm Bài Viết</h2>
    <form @submit.prevent="submitArticle">
      <div class="form-group">
        <label for="topicId">Chủ Đề</label>
        <div class="multi-select">
          <div class="topic-list">
            <div v-for="topic in topics" :key="topic.id" class="checkbox-group">
              <input type="checkbox" :id="'topic-' + topic.id" :value="topic.id" v-model="selectedTopics" />
              <label :for="'topic-' + topic.id">{{ topic.name }}</label>
            </div>
          </div>
        </div>
        <div class="selected-topics">
          <span v-for="topicId in selectedTopics" :key="topicId" class="selected-topic">
            {{ topics.find(t => t.id === topicId)?.name }}
          </span>
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
        topicId: 30
      },
      selectedTopics: [],
      topics: [],
      message: "",
      error: "",
    };
  },
  watch: {
    selectedTopics() {
      this.article.tag = this.selectedTopics.join(";");
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
      };
      this.selectedTopics = [];
    },
  },
};
</script>

<style scoped>
.add-article {
  max-width: 500px;
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
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
}

.multi-select {
  display: flex;
  flex-direction: column;
  max-height: 150px;
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
  margin-top: 10px;
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
  background: #066506;
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