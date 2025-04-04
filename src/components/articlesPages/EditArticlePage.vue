<template>
    <div class="edit-article">
      <h2>Chỉnh Sửa Bài Viết</h2>
  
      <form v-if="article" @submit.prevent="updateArticle">
        <div class="form-group">
          <label for="topicId">ID Chủ Đề</label>
          <input type="number" id="topicId" v-model="article.topicId" required />
        </div>
  
        <div class="form-group">
          <label for="title">Tiêu Đề</label>
          <input type="text" id="title" v-model="article.title" required />
        </div>
  
        <div class="form-group">
          <label for="description">Mô Tả</label>
          <textarea id="description" v-model="article.description"></textarea>
        </div>
  
        <div class="form-group">
          <label for="textData">Nội Dung</label>
          <textarea id="textData" v-model="article.textData"></textarea>
        </div>
  
        <div class="form-group">
          <label for="tag">Thẻ</label>
          <input type="text" id="tag" v-model="article.tag" />
        </div>
  
        <button type="submit">Cập Nhật Bài Viết</button>
      </form>
  
      <p v-if="message" class="success-message">{{ message }}</p>
      <p v-if="error" class="error-message">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { useRoute, useRouter } from "vue-router";
  
  export default {
    data() {
      return {
        article: null,
        message: "",
        error: "",
      };
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      return { route, router };
    },
    async created() {
      const articleId = this.route.params.id;
      await this.fetchArticle(articleId);
    },
    methods: {
      async fetchArticle(id) {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(`http://localhost:8080/article/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          this.article = response.data;
        } catch (err) {
          this.error = "Không thể tải bài viết!";
        }
      },
      async updateArticle() {
        try {
          const token = localStorage.getItem("token");
          await axios.put(`http://localhost:8080/article/${this.article.id}`, this.article, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          this.message = "Bài viết đã được cập nhật!";
          this.error = "";
          setTimeout(() => this.router.push("/"), 2000);
        } catch (err) {
          this.error = "Lỗi khi cập nhật bài viết!";
          this.message = "";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .edit-article {
    max-width: 500px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
  }
  
  h2 {
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-weight: bold;
  }
  
  input,
  textarea {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #066506;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #054b04;
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