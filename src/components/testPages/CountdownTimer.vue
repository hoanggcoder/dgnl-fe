<template>
    <div class="timer" :class="timerColor">
      {{ formattedTime }}
    </div>
  </template>
  
  <script>
  export default {
    props: {
      timeLimit: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        timeRemaining: this.timeLimit * 60, 
        interval: null,
      };
    },
    computed: {
      formattedTime() {
        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      },
      timerColor() {
        if (this.timeRemaining < 60) return "red"; 
        if (this.timeRemaining < 120) return "orange"; 
        return "green";
      },
    },
    methods: {
      startTimer() {
        this.interval = setInterval(() => {
          if (this.timeRemaining > 0) {
            this.timeRemaining--;
          } else {
            clearInterval(this.interval);
            this.$emit("time-up");
          }
        }, 1000);
      },
    },
    mounted() {
      this.startTimer();
    },
    beforeUnmount() {
      clearInterval(this.interval);
    },
  };
  </script>
  
  <style scoped>
  .timer {
    font-size: 24px;
    font-weight: bold;
    padding: 12px 20px;
    border-radius: 10px;
    display: inline-block;
    text-align: center;
    transition: all 0.5s ease-in-out;
  }
  
  .green {
    color: white;
    background: linear-gradient(135deg, #28a745, #218838);
  }
  
  .orange {
    color: white;
    background: linear-gradient(135deg, #ff9800, #e65100);
  }
  
  .red {
    color: white;
    background: linear-gradient(135deg, #d60000, #ff1a1a);
    animation: blink 1s infinite alternate;
  }
  
  @keyframes blink {
    0% { opacity: 1; }
    100% { opacity: 0.6; }
  }
  </style>