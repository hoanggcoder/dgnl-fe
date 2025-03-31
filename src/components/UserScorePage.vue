<template>
  <div class="score-section">
    <div class="score-table">
      <PersonalScore :userId="userId" />
    </div>
    <div class="score-charts">
      <ScoreChart :userId="userId" />
      <ScoreChart2 :userId="userId" />
    </div>
  </div>
</template>

<script>
import PersonalScore from "./PersonalScore.vue";
import ScoreChart from "./ScoreChart.vue";
import ScoreChart2 from "./ScoreChart2.vue";

export default {
  components: { PersonalScore, ScoreChart, ScoreChart2 },
  data() {
    return {
      userId: localStorage.getItem("id"),
    };
  },
};
</script>

<style scoped>
.score-section {
  width: 100%;
  padding: 20px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

.score-table {
  flex: 1;
  max-width: 40%;
}

.score-charts {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 50px;
}
</style>