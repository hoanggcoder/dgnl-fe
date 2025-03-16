<template>
    <div class="container">
      <h2>All Questions</h2>
      <div v-for="question in paginatedQuestions" :key="question.id" class="question-item">
        <div class="question-content">
          <h3>{{ question.detail }}</h3>
          <p><strong>Type:</strong> {{ question.type }}</p>
          <p><strong>Topic ID:</strong> {{ question.topicId }}</p>
          <p><strong>Choices:</strong> {{ question.choice1 }}, {{ question.choice2 }}, {{ question.choice3 }}, {{ question.choice4 }}</p>
          <p><strong>Answer:</strong> {{ question.answer }}</p>
        </div>
        <div class="actions">
          <button @click="editQuestion(question.id)" class="edit-btn">✏️</button>
          <button @click="deleteQuestion(question.id)" class="delete-btn">🗑</button>
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
  import axios from 'axios';
  
  export default {
    data() {
      return {
        questions: [],
        currentPage: 1,
        itemsPerPage: 10,
      };
    },
    computed: {
      totalPages() {
        return Math.ceil(this.questions.length / this.itemsPerPage);
      },
      paginatedQuestions() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        return this.questions.slice(start, start + this.itemsPerPage);
      },
    },
    methods: {
      async fetchQuestions() {
        try {
          const response = await axios.get('http://localhost:8080/questions');
          this.questions = response.data;
        } catch (error) {
          console.error('Error fetching questions:', error);
        }
      },
      editQuestion(id) {
        this.$router.push(`/edit-question/${id}`);
      },
      async deleteQuestion(id) {
        if (confirm('Are you sure you want to delete this question?')) {
          try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:8080/questions/${id}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            this.questions = this.questions.filter(q => q.id !== id);
            alert('Question deleted successfully.');
          } catch (error) {
            console.error('Error deleting question:', error);
            alert('Failed to delete question.');
          }
        }
      },
    },
    mounted() {
      this.fetchQuestions();
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
  }
  
  .question-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
  }
  
  .question-content h3 {
    margin: 0;
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