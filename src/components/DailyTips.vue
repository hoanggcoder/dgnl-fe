<template>
    <div class='daily-tips'>
      <h2>Lời khuyên cho bạn</h2>
      <p class='tip'>{{ currentTip }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "DailyTips",
    data() {
      return {
        tips: [
          "Start your day with a study plan.",
          "Take short breaks to stay focused.",
          "Practice past exam papers regularly.",
          "Stay hydrated and eat healthy snacks.",
          "Teach someone else to reinforce your learning.",
          "Use mnemonic devices to remember key concepts.",
          "Get enough sleep before the exam day.",
        ],
        currentTip: "",
      };
    },
    mounted() {
      this.getRandomTip();
    },
    methods: {
      getRandomTip() {
        const randomIndex = Math.floor(Math.random() * this.tips.length);
        this.currentTip = this.tips[randomIndex];
      },
    },
  };
  </script>
  
  <style scoped>
  .daily-tips {
    text-align: center;
    background: linear-gradient(135deg, #6e8efb, #a777e3);
    color: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    margin: auto;
    font-family: 'Arial', sans-serif;
  }
  .tip {
    font-size: 18px;
    font-weight: bold;
    margin: 15px 0;
  }
  .tip-button {
    background-color: #ff9800;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: 0.3s;
  }
  .tip-button:hover {
    background-color: #e68900;
  }
  </style>