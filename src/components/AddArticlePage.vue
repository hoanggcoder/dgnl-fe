<template>
    <div class="add-article">
      <h2>Thêm Bài Viết</h2>
      <form @submit.prevent="submitArticle">
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
  
        <button type="submit">Thêm Bài Viết</button>
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
          topicId: null,
          title: "",
          description: "",
          textData: "",
          tag: "",
          createdDate: new Date().toISOString().split("T")[0],
        },
        message: "",
        error: "",
      };
    },
    methods: {
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
          topicId: null,
          title: "",
          description: "",
          textData: "",
          tag: "",
          createdDate: new Date().toISOString().split("T")[0],
        };
      },
    },
  };
  </script>
  
  <style scoped>
  .add-article {
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