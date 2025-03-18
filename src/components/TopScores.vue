<template>
    <div class="container">
      <h2>Top 10 Users - {{ examName }}</h2>
      <div v-if="scores.length > 0">
        <table class="score-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(score, index) in scores" :key="score.id">
              <td>#{{ index + 1 }}</td>
              <td>{{ score.username }}</td>
              <td>{{ score.score }}</td>
              <td>{{ formatDate(score.finishDate) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>No scores available.</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    props: {
      examId: {
        type: Number,
        required: true,
      },
      examName: {
        type: String,
        default: "Exam",
      },
    },
    data() {
      return {
        scores: [],
      };
    },
    methods: {
      async fetchTopScores() {
        try {
          const response = await axios.get(`http://localhost:8080/score/exam/${this.examId}/top10`);
          this.scores = response.data;
            console.log("Fetched scores:", this.scores);
        } catch (error) {
          console.error("Error fetching scores:", error);
        }
      },
      formatDate(date) {
        return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
      },
    },
    mounted() {
      this.fetchTopScores();
    },
  };
  </script>
  
  <style>
  .container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    text-align: center;
  }
  h2 {
    color: #333;
  }
  .score-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  .score-table th, .score-table td {
    border: 1px solid #ddd;
    padding: 10px;
  }
  .score-table th {
    background-color: #066506;
    color: white;
  }
  .score-table tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  </style>