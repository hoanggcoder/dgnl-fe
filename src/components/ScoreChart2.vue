<template>
    <div class="chart-container">
      <h2>Thông tin câu trả lời</h2>
      <PieChart v-if="loaded" :chart-data="chartData" :options="chartOptions" />
      <p v-else>Đang tải</p>
    </div>
  </template>
  
  <script>
  import { PieChart } from "vue-chart-3";
  import { Chart, registerables } from "chart.js";
  import axios from "axios";
  
  Chart.register(...registerables);
  
  export default {
    components: { PieChart },
    props: {
      userId: Number,
    },
    data() {
      return {
        loaded: false,
        chartData: {
          labels: ["Đúng", "Sai", "Không trả lời"],
          datasets: [
            {
              label: "Tổng kết câu hỏi",
              data: [0, 0, 0],
              backgroundColor: ["#066506", "#fa0404", "#7b7c7b"],
              borderWidth: 1,
            },
          ],
        },
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "bottom" },
          },
        },
      };
    },
    mounted() {
      this.fetchScoreData();
    },
    methods: {
      async fetchScoreData() {
        try {
          const response = await axios.get(`http://localhost:8080/user/score-stat/${this.userId}`);
          this.chartData.datasets[0].data = response.data;
          this.loaded = true;
        } catch (error) {
          console.error("Error fetching score data:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .chart-container {
    width: 400px;
    height: 400px;
    margin: auto;
    text-align: center;
  }
  </style>
  