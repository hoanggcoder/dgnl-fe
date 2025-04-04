<template>
    <div class="container">
      <h2>Lịch thi Đánh giá năng lực 2025</h2>
      <p>Ngày hôm nay: {{ getDayName(currentDate) }}</p>
      
      <div class="progress-container">
        <div class="progress-bar"></div>
        <div class="progress" :style="{ width: getProgress(currentDate) + '%' }"></div>
        <div v-for="(event, index) in examTimeline" :key="index" 
             class="progress-step" 
             :class="{ 'completed': isPast(event.date), 'current': isToday(event.date) }"
             :style="{ left: getProgress(event.date) + '%' }">
          <span class="tooltip">{{ event.name }}<br> {{ getDayName(event.date) }}</span>
        </div>
      </div>
  
      <div class="timeline">
        <div v-for="(event, index) in examTimeline" :key="index" class="timeline-item" :class="{ 'today': isToday(event.date), 'past': isPast(event.date) }">
          <p><strong>{{ getDayName(event.date) }}</strong> - {{ event.name }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentDate: new Date().toISOString().split("T")[0],
        examTimeline: [
        { date: "2025-02-23", name: "Đăng ký thi đợt 501" },
        { date: "2025-03-01", name: "Kết thúc đăng ký đợt 501" },
        { date: "2025-03-07", name: "Kết thúc đăng ký các đợt 502-506"},
        { date: "2025-03-15", name: "Thi ĐGNL đợt 501" },
        { date: "2025-03-29", name: "Thi ĐGNL đợt 502" },
        { date: "2025-04-12", name: "Thi ĐGNL đợt 503" },
        { date: "2025-04-19", name: "Thi ĐGNL đợt 504" },
        { date: "2025-05-10", name: "Thi ĐGNL đợt 505" },
        { date: "2025-05-17", name: "Thi ĐGNL đợt 506" },
      ]
      };
    },
    methods: {
      isToday(date) {
        return date === this.currentDate;
      },
      isPast(date) {
        return new Date(date) < new Date(this.currentDate);
      },
      getDayName(dateString) {
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); 
            const year = date.getFullYear();
            return `${day}-${month}-${year}`; 
        }, 
      getProgress(date) {
        const startDate = new Date(this.examTimeline[0].date);
        const endDate = new Date(this.examTimeline[this.examTimeline.length - 1].date);
        const eventDate = new Date(date);
        return ((eventDate - startDate) / (endDate - startDate)) * 100;
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    background: #f3f7f0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
  
  h2 {
    font-size: 24px;
    font-weight: bold;
    color: #066506;
    margin-bottom: 15px;
  }
  
  .progress-container {
    position: relative;
    width: 100%;
    height: 30px;
  }
  
  .progress-bar {
    position: absolute;
    top: 50%;
    width: 100%;
    height: 5px;
    background: #ddd;
    transform: translateY(-50%);
  }
  
  .progress {
    position: absolute;
    top: 50%;
    height: 5px;
    background: #066506;
    transform: translateY(-50%);
  }
  
  .progress-step {
    position: absolute;
    top: 0;
    width: 15px;
    height: 15px;
    background: #bbb;
    border-radius: 50%;
    transform: translateX(-50%);
  }
  
  .progress-step.completed {
    background: #066506;
  }
  
  .progress-step.current {
    background: red;
  }
  
  .tooltip {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 5px;
    border-radius: 5px;
    font-size: 12px;
    white-space: nowrap;
    visibility: hidden;
  }
  
  .progress-step:hover .tooltip {
    visibility: visible;
  }
  
  .timeline {
    border-left: 3px solid #066506;
    padding-left: 15px;
  }
  
  .timeline-item {
    margin: 10px 0;
    padding: 10px;
    background: #f0f0f0;
    border-radius: 5px;
  }
  
  .timeline-item.today {
    background: #066506;
    color: white;
    font-weight: bold;
  }
  
  .timeline-item.past {
    opacity: 0.6;
    background-color: #066506;
  }
  </style>
  