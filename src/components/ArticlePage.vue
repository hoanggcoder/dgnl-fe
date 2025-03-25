<template>
  <div class="article-container">
    <div class="article-content" v-if="article">
      <h1>{{ article.title }}</h1>
      <p v-for="(paragraph, index) in article.textData.split('\n')" :key="index">
        {{ paragraph }}
      </p>
      <img :src="article.image || defaultImage" alt="Article Image" class="article-image" />
    </div>

    <div class="sidebar">
      <h2>Tin khác</h2>
      <ul>
        <li v-for="news in relatedNews" :key="news.id" class="news-item">
          <img :src="news.image || defaultImage" alt="News Image" class="news-image" />
          <router-link :to="`/article/${news.id}`" class="news-title">{{ news.title }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      article: null,
      relatedNews: [],
      defaultImage: require('@/assets/news_default.png')
    };
  },
  created() {
    this.fetchArticle();
    this.fetchRelatedNews();
  },
  methods: {
    async fetchArticle() {
      const articleId = this.$route.params.id;
      try {
        const response = await axios.get(`http://localhost:8080/article/${articleId}`);
        this.article = response.data;
        console.log("Fetched article:", this.article);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    },
    async fetchRelatedNews() {
      try {
        const response = await axios.get("http://localhost:8080/article");
        this.relatedNews = response.data.slice(0, 4);
      } catch (error) {
        console.error("Error fetching related news:", error);
      }
    }
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler() {
        this.fetchArticle();
      }
    }
  }
};
</script>

<style scoped>
.article-container {
  display: flex;
  max-width: 1200px;
  margin: auto;
  gap: 20px;
  padding: 20px;
}

.article-content {
  flex: 2;
  background: white;
}

.article-content h1 {
  font-size: 24px;
  font-weight: bold;
}

.article-content p {
  font-size: 18px;
  line-height: 1.6;
}

.article-image {
  width: 100%;
  margin-top: 10px;
  border-radius: 5px;
}

.sidebar {
  flex: 1;
  background: white;
  padding: 10px;
}

.sidebar h2 {
  font-size: 20px;
  font-weight: bold;
}

.news-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.news-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-right: 10px;
}

.news-title {
  text-decoration: none;
  color: black;
  font-size: 16px;
  font-weight: bold;
}
</style>