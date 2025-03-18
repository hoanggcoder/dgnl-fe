<template>
  <div class="exam-container" v-if="exam">
    <h1 class="title">Thông tin cuộc thi</h1>
    
    <div class="exam-card">
      <div class="exam-details">
        <p><strong>Tên:</strong> {{ exam.name }}</p>
        <p><strong>Loại:</strong> {{ exam.type }}</p>
        <p><strong>Mô tả:</strong> {{ exam.description || 'Không có mô tả' }}</p>
        <p><strong>Độ khó:</strong> {{ exam.difficulty }}</p>
        <p><strong>Thời gian bắt đầu:</strong> {{ formatDate(exam.startTime) }}</p>
        <p><strong>Thời gian kết thúc:</strong> {{ formatDate(exam.endTime) }}</p>
      </div>
      <button @click="goToTest" class="start-button" :disabled="!test">Bắt đầu thi</button>
    </div>

    <TopScores :examId="exam.id" :examName="exam.name" />

  </div>
  
  <p v-else class="loading-message">Đang tải thông tin cuộc thi...</p>
</template>

<script>
import axios from "axios";
import TopScores from "@/components/TopScores.vue"; 

export default {
  name: "ExamPage",
  components: { TopScores }, 
  data() {
    return {
      exam: null,
      test: null,
    };
  },
  async mounted() {
    await this.fetchExam();
    await this.fetchTest();
  },
  methods: {
    async fetchExam() {
      const examId = this.$route.params.id;
      try {
        const response = await axios.get(`http://localhost:8080/exam/${examId}`);
        this.exam = response.data;
        console.log("Fetched exam:", this.exam);
      } catch (error) {
        console.error("Error fetching exam:", error);
      }
    },
    async fetchTest() {
      const examId = this.$route.params.id;
      try {
        const response = await axios.get(`http://localhost:8080/exam/get-test/${examId}`);
        this.test = response.data;
        console.log("Fetched test:", this.test);
      } catch (error) {
        console.error("Error fetching test:", error);
      }
    },
    goToTest() {
      if (this.test && this.test.id) {
        this.$router.push({
          path: `/test/${this.test.id}`,
          query: {
            examName: this.exam.name,
            examId: this.$route.params.id,
          },
        });
      } else {
        console.error("Test data is not available");
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
};
</script>

<style scoped>
.exam-container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  text-align: center;
}

.title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.exam-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.exam-details p {
  font-size: 18px;
  margin: 10px 0;
}

.start-button {
  width: 100%;
  padding: 12px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  background: #28a745;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

.start-button:hover {
  background: #218838;
}

.start-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.loading-message {
  text-align: center;
  font-size: 18px;
  color: #666;
}
</style>