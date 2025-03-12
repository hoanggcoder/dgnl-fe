<template>
    <div class="container">
      <div v-for="article in paginatedArticles" :key="article.id" class="article">
        <img :src="article.image ? article.image : require('@/assets/article_default.png')" class="article.image" alt="Article Image" />
        <div class="article-content">
          <router-link :to="`/article/${article.id}`">
          <h2 class="article-title">{{ article.title }}</h2>
          </router-link>
          <p class="article-description">{{ article.description }}</p>
        </div>
      </div>
      
      <div class="pagination">
        <button 
          v-for="page in totalPages" 
          :key="page" 
          @click="currentPage = page" 
          class="page-button" 
          :class="{'active': currentPage === page}">
          {{ page }}
        </button>
      </div>
    </div>
  </template>
  
<script>
import axios from 'axios';

export default {
  data() {
    return {
      articles: [],
      currentPage: 1,
      itemsPerPage: 10
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.articles.length / this.itemsPerPage);
    },
    paginatedArticles() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.articles.slice(start, start + this.itemsPerPage);
    }
  },
  methods: {
    async fetchArticles() {
      try {
        const response = await axios.get('http://localhost:8080/articles');
        this.articles = response.data;
        console.log('Fetched articles:', this.articles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    }
  },
  mounted() {
    this.fetchArticles();
  }
};
</script>
  
  <style>
  .container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
  }
  .article {
    display: flex;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }
  .article-image {
    width: 20%; 
    height: 40px; 
    object-fit: scale-down;
    border-radius: 5px;
}
  .article-content {
    margin-left: 20px;
    flex: 1;
  }
  .article-title {
    font-size: 20px;
    font-weight: bold;
    text-decoration: none;  
    color: inherit;
  }
  .article-description {
    color: #666;
  }
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .page-button {
    margin: 0 5px;
    padding: 8px 12px;
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