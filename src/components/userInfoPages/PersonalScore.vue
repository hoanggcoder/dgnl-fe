<template>
    <div class="user-exam-scores-container">
      <h2>Điểm cao nhất của các bài thi đã hoàn thành</h2>
      <table v-if="examScores.length">
        <thead>
          <tr>
            <th>Tên kỳ thi</th>
            <th>Điểm</th>
            <th>Ngày hoàn thành</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="score in examScores" :key="score.examId">
            <td>{{ score.examname }}</td>
            <td>{{ parseFloat(score.score).toFixed(2) }}</td>
            <td>{{ formatDate(score.finishDate) }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else>Bạn chưa tham gia kỳ thi nào</p>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    props: {
      userId: Number,
      userName: String,
    },
    data() {
      return {
        examScores: [],
      };
    },
    async mounted() {
      await this.fetchUserExamScores();
    },
    methods: {
      async fetchUserExamScores() {
        try {
          const response = await axios.get(
            `http://localhost:8080/score/user/${this.userId}/best`
          );
          this.examScores = response.data;
        } catch (error) {
          console.error("Error fetching user exam scores:", error);
        }
      },
      formatDate(dateString) {
        return new Date(dateString).toLocaleDateString();
      },
    },
  };
  </script>
  
  <style scoped>
  .user-exam-scores-container {
    max-width: 700px;
    margin: auto;
    padding: 20px;
    background: #f3f7f0;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }
  
  th, td {
    padding: 10px;
    border: 1px solid #ddd;
  }
  
  th {
    background: #066506;
    color: white;
  }
  
  td {
    background: #fff;
  }
  </style>