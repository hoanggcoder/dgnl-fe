<template>
  <div class="container">
    <div v-for="exam in paginatedExams" :key="exam.id" class="exam-card">
      <img 
        :src="exam.image ? exam.image : require('@/assets/exam_default.png')" 
        class="exam-image" 
        alt="Exam Image" 
      />
      <div class="exam-content">
        <router-link :to="`/exam/${exam.id}`" class="exam-title">
          <h2>{{ exam.name }}</h2>
        </router-link>
        <p class="exam-description">{{ exam.description }}</p>
        <p class="exam-difficulty">Mức độ: <span>{{ exam.difficulty }}</span></p>
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

<style scoped>
.container {
  max-width: 900px;
  margin: auto;
  padding: 20px;
}

.exam-card {
  display: flex;
  align-items: center;
  background: #fff;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.exam-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.exam-image {
  width: 120px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.exam-content {
  margin-left: 20px;
  flex: 1;
}

.exam-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  text-decoration: none;
  transition: color 0.3s;
}

.exam-title h2 {
  margin: 0;
}

.exam-title:hover {
  color: #066506;
}

.exam-description {
  color: #555;
  font-size: 16px;
  margin-top: 5px;
}

.exam-difficulty {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  margin-top: 5px;
}

.exam-difficulty span {
  font-weight: normal;
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