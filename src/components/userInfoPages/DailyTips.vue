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
          "HÃy sử dụng hết thời gian được cho phép và xem lại câu hỏi.",
          "Ôn luyện kỹ hơn ở phần 1",
          "Chú ý điền đúng chính tả và đúng cấu trúc được yêu cầu cho câu hỏi điền đáp án",
          "Hãy làm các đề thi thử để làm quen với áp lực thời gian.",
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
    background: #f3f7f0;
    color: #066506;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    margin: auto;
    margin-top: 40px;
    font-family: 'Helvetica', sans-serif;
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