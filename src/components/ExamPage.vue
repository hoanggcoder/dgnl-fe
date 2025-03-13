<template>
    <div class="exam-container" v-if="exam">
      <h1 class="title">Thông tin cuộc thi</h1>
      <div class="exam-details">
        <p><strong>Tên:</strong> {{ exam.name }}</p>
        <p><strong>Loại:</strong> {{ exam.type }}</p>
        <p><strong>Mô tả:</strong> {{ exam.description || 'No description provided' }}</p>
        <p><strong>Độ khó:</strong> {{ exam.difficulty }}</p>
        <p><strong>Thời gian bắt đầu:</strong> {{ exam.startTime }}</p>
        <p><strong>Thời gian kết thúc:</strong> {{ exam.endTime }}</p>
      </div>
      <button @click="goToTest" class="start-button" :disabled="!test">Bắt đầu thi</button>
    </div>
    <p v-else>Loading exam details...</p>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: "ExamPage",
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
          this.$router.push(`/test/${this.test.id}`);
        } else {
          console.error("Test data is not available");
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .exam-container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  .title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  .exam-details p {
    font-size: 18px;
    margin: 10px 0;
  }
  .start-button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 18px;
    color: white;
    background: #fa0404;
    border: none;
    border-radius: 5px;
    cursor: pointer
  }
  .start-button:hover {
    background: #fa0404;
  }
  </style>