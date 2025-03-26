<template>
    <div class="score-section">
      <PersonalScore :userId="userId" />
      <ScoreChart :userId="userId" />
    </div>
  </template>
  
  <script>
  import PersonalScore from "./PersonalScore.vue";
  import ScoreChart from "./ScoreChart.vue";
  
  export default {
    components: { PersonalScore, ScoreChart },
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
    max-width: 45%;
  }
  
  .score-chart {
    flex: 1;
    max-width: 50%;
  }
  </style>