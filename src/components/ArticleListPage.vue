<template>
  <div class="container">
    <div 
      v-for="article in paginatedArticles" 
      :key="article.id" 
      class="article-card"
      @click="$router.push(`/article/${article.id}`)"
    >
      <img 
        :src="article.image ? article.image : require('@/assets/article_default.png')" 
        class="article-image" 
        alt="Article Image" 
      />
      <div class="article-content">
        <h2 class="article-title">{{ article.title }}</h2>
        <p class="article-description">{{ article.description }}</p>
      </div>
    </div>

    <div class="pagination">
      <button 
        v-for="page in totalPages" 
        :key="page" 
        @click="currentPage = page" 
        class="page-button" 
        :class="{ 'active': currentPage === page }">
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
        const response = await axios.get('http://localhost:8080/article');
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

<style scoped>
.container {
  max-width: 900px;
  margin: auto;
  padding: 20px;
}

.article-card {
  display: flex;
  align-items: center;
  background: #fff;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  cursor: pointer;
}

.article-card:hover {
  transform: translateY(-5px);
}

.article-image {
  width: 100px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.article-content {
  margin-left: 20px;
  flex: 1;
}

.article-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  text-decoration: none;
  transition: color 0.3s;
}

.article-title:hover {
  color: #066506;
}

.article-description {
  color: #555;
  font-size: 16px;
  margin-top: 5px;
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
  border-radius: 5px;
  font-size: 16px;
  transition: all 0.3s ease;
}

.page-button:hover {
  background: #066506;
  color: white;
}

.page-button.active {
  background: #066506;
  color: white;
}
</style>
