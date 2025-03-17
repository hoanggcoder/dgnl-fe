<template>
    <div class="container">
      <h2>All Questions</h2>
  
      <div class="filters">
        <input v-model="searchQuery" placeholder="Tìm kiếm văn bản" class="search-input" />
  
        <select v-model="selectedType" class="filter-select">
          <option value="">Tất cả các loại câu hỏi</option>
          <option value="multiple_choices">Trắc nghiệm khách quan</option>
          <option value="fill_in">Điền đáp án</option>
        </select>
  
        <select v-model="selectedTopic" class="filter-select">
          <option value="">Chủ đề</option>
          <option v-for="topic in uniqueTopics" :key="topic" :value="topic">
            Topic {{ topic }}
          </option>
        </select>
      </div>
  
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
        searchQuery: '',
        selectedType: '',
        selectedTopic: '',
      };
    },
    computed: {
      uniqueTopics() {
        return [...new Set(this.questions.map(q => q.topicId))];
      },
      
      filteredQuestions() {
        return this.questions.filter(q => {
          const matchesText = q.detail.toLowerCase().includes(this.searchQuery.toLowerCase());
          const matchesType = this.selectedType ? q.type === this.selectedType : true;
          const matchesTopic = this.selectedTopic ? q.topicId == this.selectedTopic : true;
          return matchesText && matchesType && matchesTopic;
        });
      },
      
      totalPages() {
        return Math.ceil(this.filteredQuestions.length / this.itemsPerPage);
      },
  
      paginatedQuestions() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        return this.filteredQuestions.slice(start, start + this.itemsPerPage);
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
  
  .filters {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
  }
  
  .search-input, .filter-select {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    flex: 1;
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