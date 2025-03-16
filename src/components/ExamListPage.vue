<template>
    <div class="container">
      <div v-for="exam in paginatedExams" :key="exam.id" class="exam">
        <img :src="exam.image ? exam.image : require('@/assets/exam_default.png')" class="exam-image" alt="exam Image" />
        <div class="exam-content">
          <router-link :to="`/exam/${exam.id}`">
          <h2 class="exam-title">{{ exam.name }}</h2>
          </router-link>
          <p class="exam-description">{{ exam.description }}</p>
          <p class="exam-difficulty">Mức độ : {{ exam.difficulty }}</p>
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
      exams: [],
      currentPage: 1,
      itemsPerPage: 10
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.exams.length / this.itemsPerPage);
    },
    paginatedExams() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.exams.slice(start, start + this.itemsPerPage);
    }
  },
  methods: {
    async fetchExams() {
      try {
        const response = await axios.get('http://localhost:8080/exam');
        this.exams = response.data;
        console.log('Exams:', this.exams);
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    }
  },
  mounted() {
    this.fetchExams();
  }
};
</script>
  
  <style>
  .container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
  }
  .exam {
    display: flex;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }
  .exam-image {
    width: 30%;
    height: 150px;
    object-fit: cover;
    border-radius: 5px;
  }
  .exam-content {
    margin-left: 20px;
    flex: 1;
  }
  .exam-title {
    font-size: 20px;
    font-weight: bold;
  }
  .exam-description {
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