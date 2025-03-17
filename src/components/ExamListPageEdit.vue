<template>
  <div class="container">
    <div v-for="exam in paginatedExams" :key="exam.id" class="exam">
      <img :src="exam.image || defaultImage" class="exam-image" alt="Exam Image" />
      <div class="exam-content">
        <h2 class="exam-title">{{ exam.title }}</h2>
        <p class="exam-description">{{ exam.description }}</p>
        <p class="exam-difficulty">Mức độ: {{ exam.difficulty }}</p>
      </div>
      <div class="actions">
        <button @click="editExam(exam.id)" class="edit-btn">✏️</button>
        <button @click="deleteExam(exam.id)" class="delete-btn">🗑</button>
      </div>
    </div>

    <div class="pagination">
      <button 
        v-for="page in totalPages" 
        :key="page" 
        @click="currentPage = page" 
        class="page-button" 
        :class="{ active: currentPage === page }">
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      exams: [],
      currentPage: 1,
      itemsPerPage: 5,
      defaultImage: require("@/assets/exam_default.png"),
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.exams.length / this.itemsPerPage);
    },
    paginatedExams() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.exams.slice(start, start + this.itemsPerPage);
    },
  },
  methods: {
    async fetchExams() {
      try {
        const response = await axios.get("http://localhost:8080/exam");
        this.exams = response.data;
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    },
    editExam(id) {
      this.$router.push(`/edit-exam/${id}`);
    },
    
    async deleteExam(id) {
      const token = localStorage.getItem("token");
      if (confirm("Bạn có chắc muốn xóa bài thi này?")) {
        try {
          await axios.delete(`http://localhost:8080/exam/${id}`,
          {headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        });
          this.exams = this.exams.filter(exam => exam.id !== id);
          alert("Bài thi đã được xóa.");
        } catch (error) {
          console.error("Lỗi khi xóa bài thi:", error);
        }
      }
    },
  },
  mounted() {
    this.fetchExams();
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}
.exam {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}
.exam-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
}
.exam-content {
  flex: 1;
  margin-left: 15px;
}
.exam-title {
  font-size: 18px;
  color: #333;
}
.exam-description {
  color: #666;
}
.exam-difficulty {
  font-weight: bold;
  color: #007bff;
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
  background-color: #007bff;
  color: white;
}
.delete-btn {
  background-color: #dc3545;
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