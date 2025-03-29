<template>
  <div class="container">
    <div v-for="exam in paginatedExams" :key="exam.id" 
         class="exam-card" 
         :class="difficultyClass(exam.difficulty)">
      <div class="exam-info">
        <router-link :to="`/exam/${exam.id}`" class="exam-title">
          <h2>{{ exam.name }}</h2>
        </router-link>
        <p class="exam-description">{{ exam.description }}</p>
      </div>
      <div class="exam-meta">
        <p class="exam-difficulty">
          Mức độ: <span>{{ formattedDifficulty(exam.difficulty) }}</span>
        </p>
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
    filteredExams() {
      return this.exams.filter(exam => exam.active);
    },
    totalPages() {
      return Math.ceil(this.filteredExams.length / this.itemsPerPage);
    },
    paginatedExams() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredExams.slice(start, start + this.itemsPerPage);
    }
  },
  methods: {
    async fetchExams() {
      try {
        const response = await axios.get('http://localhost:8080/exam');
        this.exams = response.data;
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    },
    formattedDifficulty(difficulty) {
      switch (difficulty) {
        case 'easy':
          return 'Dễ';
        case 'medium':
          return 'Trung bình';
        case 'hard':
          return 'Khó';
        default:
          return 'Không xác định';
      }
    },
    difficultyClass(difficulty) {
      switch (difficulty) {
        case 'easy':
          return 'easy-bg';
        case 'medium':
          return 'medium-bg';
        case 'hard':
          return 'hard-bg';
        default:
          return '';
      }
    }
  },
  mounted() {
    this.fetchExams();
  },
};
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: auto;
  padding: 20px;
  padding-top: 40px;
}

.exam-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.easy-bg {
  background: #d4edda; 
}

.medium-bg {
  background: #fff3cd;
}

.hard-bg {
  background: #f8d7da;
}

.exam-info {
  flex: 3;
  text-align: left; 
}

.exam-meta {
  flex: 1;
  text-align: right;
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
  font-size: 20px;
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
  font-weight: bold;
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