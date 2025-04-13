<template>
  <div class="daily-tips">
    <h2>Lời khuyên cho bạn</h2>
    <p class="tip">{{ currentTip }}</p>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "DailyTips",
  data() {
    return {
      userId: localStorage.getItem("id"), 
      currentTip: "",
    };
  },
  mounted() {
    this.getDailyTip();
  },
  methods: {
    getDailyTip() {
      if (this.userId) {
        const userIdAsNumber = parseInt(this.userId, 10);
        
        if (!isNaN(userIdAsNumber)) {
          axios
            .get(`http://localhost:8080/user/daily-tip/${userIdAsNumber}`)
            .then((response) => {
              this.currentTip = response.data;
            })
            .catch((error) => {
              console.error("There was an error fetching the daily tip:", error);
              this.currentTip = "Lỗi khi tải lời khuyên."; 
            });
        } else {
          console.error("Invalid userId format");
          this.currentTip = "ID người dùng không hợp lệ."; 
        }
      } else {
        this.currentTip = "Không có ID người dùng.";
      }
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