<template>
    <div class="container">
      <div v-for="article in paginatedArticles" :key="article.id" class="article">
        <img 
          :src="article.image || defaultImage" 
          class="article-image" 
          alt="Article Image" 
        />
        <div class="article-content">
          <router-link :to="`/article/${article.id}`">
            <h2 class="article-title">{{ article.title }}</h2>
          </router-link>
          <p class="article-description">{{ article.description }}</p>
        </div>
        <div class="actions">
          <button @click="editArticle(article.id)" class="edit-btn">✏️</button>
          <button @click="deleteArticle(article.id)" class="delete-btn">🗑</button>
        </div>
      </div>
  
      <div class="pagination">
        <button 
          v-for="page in totalPages" 
          :key="page" 
          @click="currentPage = page" 
          :class="{ active: currentPage === page }" 
          class="page-button"
        >
          {{ page }}
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        articles: [],
        currentPage: 1,
        itemsPerPage: 10,
        defaultImage: require("@/assets/article_default.png"),
      };
    },
    computed: {
      totalPages() {
        return Math.ceil(this.articles.length / this.itemsPerPage);
      },
      paginatedArticles() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        return this.articles.slice(start, start + this.itemsPerPage);
      },
    },
    methods: {
      async fetchArticles() {
        try {
          const response = await axios.get("http://localhost:8080/article");
          this.articles = response.data;
        } catch (error) {
          console.error("Error fetching articles:", error);
        }
      },
      editArticle(id) {
        this.$router.push(`/edit-article/${id}`);
      },
      async deleteArticle(id) {
        if (confirm("Bạn có chắc muốn xóa bài viết này?")) {
          try {
            await axios.delete(`http://localhost:8080/articles/${id}`);
            this.articles = this.articles.filter(article => article.id !== id);
            alert("Bài viết đã được xóa.");
          } catch (error) {
            console.error("Lỗi khi xóa bài viết:", error);
          }
        }
      },
    },
    mounted() {
      this.fetchArticles();
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
  }
  
  .article {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
  }
  
  .article-image {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 5px;
  }
  
  .article-content {
    flex: 1;
    margin-left: 15px;
  }

  .article-content a {
  text-decoration: none;
  color: inherit;
}
  
  .article-title {
    font-size: 18px;
    color: #333;
    text-decoration: none;
  }
  
  .article-description {
    color: #666;
  }
  
  .actions {
    display: flex;
    gap: 5px;
  }
  
  .edit-btn, .delete-btn {
    border: none;
    padding: 5px 8px;
    cursor: pointer;
    font-size: 14px;
    border-radius: 5px;
  }
  
  .edit-btn {
    background-color: #066506;
    color: white;
  }
  
  .delete-btn {
    background-color: #fa0404;
    color: white;
  }
  
  .pagination {
    text-align: center;
    margin-top: 20px;
  }
  
  .page-button {
    margin: 0 5px;
    padding: 5px 10px;
    border: 1px solid #066506;
    background: white;
    cursor: pointer;
    border-radius: 3px;
  }
  
  .page-button.active {
    background: #066506;
    color: white;
  }
  </style>