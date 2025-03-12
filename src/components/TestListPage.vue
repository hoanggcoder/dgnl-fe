<template>
    <div class="container">
      <div v-for="test in paginatedtests" :key="test.id" class="test">
        <img :src="test.image ? test.image : require('@/assets/exam_default.png')" class="test-image" alt="Test Image" />
        <div class="test-content">
          <h2 class="test-title">{{ test.title }}</h2>
          <p class="test-description">{{ test.description }}</p>
          <p class="test-difficulty">Mức độ : {{ test.difficulty }}</p>
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
      tests: [],
      currentPage: 1,
      itemsPerPage: 10
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.tests.length / this.itemsPerPage);
    },
    paginatedtests() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.tests.slice(start, start + this.itemsPerPage);
    }
  },
  methods: {
    async fetchTests() {
      try {
        const response = await axios.get('http://localhost:8080/exam');
        this.tests = response.data;
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    }
  },
  mounted() {
    this.fetchTests();
  }
};
</script>
  
  <style>
  .container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
  }
  .test {
    display: flex;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }
  .test-image {
    width: 30%;
    height: 150px;
    object-fit: cover;
    border-radius: 5px;
  }
  .test-content {
    margin-left: 20px;
    flex: 1;
  }
  .test-title {
    font-size: 20px;
    font-weight: bold;
  }
  .test-description {
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