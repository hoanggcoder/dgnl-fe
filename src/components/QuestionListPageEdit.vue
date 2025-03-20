<template>
  <div class="container">
    <h2 class="text-left">Danh sách câu hỏi</h2>

    <div class="filters">
      <input v-model="searchQuery" placeholder="Tìm kiếm câu hỏi" class="search-input" />

      <select v-model="selectedType" class="filter-select">
        <option value="">Tất cả loại câu hỏi</option>
        <option value="multiple_choices">Trắc nghiệm</option>
        <option value="fill_in">Điền đáp án</option>
      </select>

      <select v-model="selectedTopic" class="filter-select">
        <option value="">Tất cả chủ đề</option>
        <option v-for="topic in uniqueTopics" :key="topic" :value="topic">
          Chủ đề {{ topic }}
        </option>
      </select>
    </div>

    <div class="question-list">
      <div v-for="question in paginatedQuestions" :key="question.id" class="question-item">
        <div class="question-content text-left">
          <h3>{{ question.detail }}</h3>
          <p><strong>Loại:</strong> {{ question.type }}</p>
          <p><strong>Chủ đề:</strong> {{ question.topicId }}</p>
          <p><strong>Đáp án:</strong> {{ question.choice1 }}, {{ question.choice2 }}, {{ question.choice3 }}, {{ question.choice4 }}</p>
          <p><strong>Đáp án đúng:</strong> {{ question.answer }}</p>
        </div>
        <div class="actions">
          <button @click="editQuestion(question.id)" class="edit-btn">✏️ Sửa</button>
          <button @click="deleteQuestion(question.id)" class="delete-btn">🗑 Xóa</button>
        </div>
      </div>
    </div>

    <div class="pagination">
      <button 
        v-for="page in totalPages" 
        :key="page" 
        @click="currentPage = page" 
        :class="{ active: currentPage === page }" 
        class="page-button">
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
        const response = await axios.get('http://localhost:8080/question');
        this.questions = response.data;
      } catch (error) {
        console.error('Lỗi khi tải danh sách câu hỏi:', error);
      }
    },
    editQuestion(id) {
      this.$router.push(`/edit-question/${id}`);
    },
    async deleteQuestion(id) {
      if (confirm('Bạn có chắc chắn muốn xóa câu hỏi này không?')) {
        try {
          const token = localStorage.getItem("token");
          await axios.delete(`http://localhost:8080/question/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          this.questions = this.questions.filter(q => q.id !== id);
          alert('Xóa câu hỏi thành công.');
        } catch (error) {
          console.error('Lỗi khi xóa câu hỏi:', error);
          alert('Không thể xóa câu hỏi.');
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
  text-align: left;
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

.question-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.question-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
  text-align: left;
}

.question-content h3 {
  margin: 0;
}

.actions {
  display: flex;
  gap: 10px;
}

.edit-btn, .delete-btn {
  border: none;
  padding: 5px 10px;
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
