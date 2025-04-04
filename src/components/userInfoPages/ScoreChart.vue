<script>
import { LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import axios from "axios";

Chart.register(...registerables);

export default {
  props: {
    userId: Number,
  },
  components: {
    LineChart,
  }
  ,
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Điểm số theo thời gian",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            data: [],
            tension: 0.4,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { title: { display: true, text: "Ngày thi" } },
          y: { title: { display: true, text: "Điểm" }, beginAtZero: true },
        },
      },
    };
  },
  async mounted() {
    await this.fetchScores();
  },
  methods: {
    async fetchScores() {
      try {
        const response = await axios.get(`http://localhost:8080/score/user/${this.userId}/best`);
        if (response.data.length > 0) {
          const sortedData = response.data.sort(
            (a, b) => new Date(a.finishDate) - new Date(b.finishDate)
          );
          this.chartData.labels = sortedData.map((s) =>
            new Date(s.finishDate).toLocaleDateString()
          );
          this.chartData.datasets[0].data = sortedData.map((s) => s.score);
        }
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    },
  },
};
</script>

<template>
  <div class="chart-container">
    <LineChart :chart-data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 600px;
  height: 400px;
  margin: auto;
}
</style>