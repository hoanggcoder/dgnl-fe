<template>
    <div class="exam-container">
      <h1 class="title">Exam Details</h1>
      <div class="exam-details">
        <p><strong>Name:</strong> {{ exam.name }}</p>
        <p><strong>Type:</strong> {{ exam.type }}</p>
        <p><strong>Description:</strong> {{ exam.description || 'No description provided' }}</p>
        <p><strong>Difficulty:</strong> {{ exam.difficulty }}</p>
        <p><strong>Start Time:</strong> {{ exam.startTime }}</p>
        <p><strong>End Time:</strong> {{ exam.endTime }}</p>
      </div>
      <button @click="goToTest" class="start-button">Start Test</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ExamPage',
    data() {
      return {
        exam: {
          name: 'Sample Exam',
          type: 'Final',
          description: 'A sample final exam',
          difficulty: 'medium',
          startTime: '09:00',
          endTime: '11:00',
        },
      };
    },
    methods: {
      goToTest() {
        this.$router.push('/test');
      },
    },
  };
  </script>
  
  <style scoped>
  .exam-container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  .title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  .exam-details p {
    font-size: 18px;
    margin: 10px 0;
  }
  .start-button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 18px;
    color: white;
    background: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer
  }
  .start-button:hover {
    background: #0056b3;
  }
  </style>