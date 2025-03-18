<template>
  <div>
    <h1>{{ this.$route.query.examName }}</h1>

    <div :class="{ 'blur-content': score !== null }">
      <TestQuestion 
        v-for="(question, index) in questions" 
        :key="question.id" 
        :question="question" 
        :index="index + 1"
        @answer-submitted="handleAnswer"
      />
      <div class="button-container">
        <button @click="submitTest" class="submit-button">
          Nộp bài
        </button>
      </div>
    </div>

    <div v-if="score !== null" class="score-container">
    <p class="score-message">
      Bạn đã đạt được <strong>{{ score }}</strong> điểm!
    </p>
    <p v-if="passed" class="pass-message">🎉 Chúc mừng! Bạn đã vượt qua bài kiểm tra! 🎉</p>
    <p v-else class="fail-message">❌ Rất tiếc! Bạn chưa đạt điểm yêu cầu. ❌</p>
    <button @click="goToExam" class="return-button">Quay lại trang cuộc thi</button>
    </div>
  </div>
</template>
  
<script>
  import TestQuestion from "@/components/TestQuestion.vue";
  import axios from 'axios';
  
  export default {
    components: { TestQuestion },
    data() {
      return {
        questions: [],
        answers: {},
        test: null,
        answerInput: {
          testId: this.$route.params.id,
          answerList: '',
          userId: localStorage.getItem('id'),
        },
        score: null,
        examId: this.$route.query.examId || null, 
        scoreToPass: 0,
        passed: false, 
      };
    },
    created() {
      this.fetchTest();
    },
    methods: {
      handleAnswer({ id, answer }) {
        this.answers[id] = answer; 
      },
      goToExam() {
        if (this.examId) {
          this.$router.push(`/exam/${this.examId}`);
        }
      }
      ,
      async submitTest() {
        const formattedAnswers = this.questions
          .map((question, index) => `Q${index + 1}=${this.answers[question.id] || ''};`)
          .join("");
        this.answerInput.answerList = formattedAnswers;
        try {
          const response = await axios.post(`http://localhost:8080/test/answer-test`, this.answerInput, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          this.score = response.data.score;
          console.log("Score:", this.scoreToPass);
          this.passed = this.score >= this.scoreToPass;
        } catch (error) {
          console.error("Error fetching test:", error);
        }
      },
      async fetchTest() {
        const testId = this.$route.params.id;
        try {
          const response = await axios.get(`http://localhost:8080/test/${testId}`);
          this.questions = response.data.questionList;
          this.test = response.data;
          this.scoreToPass = response.data.scoreToPass;
        } catch (error) {
          console.error("Error fetching test:", error);
        }
      },
    }
  };
</script>
  
<style scoped>
.score-message {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  font-weight: bold;
  color: #28a745;
  background: rgba(230, 255, 230, 0.9);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 128, 0, 0.3);
  text-align: center;
  width: 300px;
}

.blur-content {
  filter: blur(5px);
  pointer-events: none;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.submit-button {
  background: linear-gradient(135deg, #d60000, #ff1a1a);
  color: white;
  font-size: 20px;
  font-weight: bold;
  padding: 14px 28px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 10px rgba(214, 0, 0, 0.4);
}

.submit-button:hover {
  background: linear-gradient(135deg, #ff1a1a, #d60000);
  transform: scale(1.08);
}

.submit-button:active {
  transform: scale(0.96);
  box-shadow: 0px 2px 8px rgba(214, 0, 0, 0.5);
}

h1 {
  text-align: center;
}

.score-container {
  text-align: center;
  margin-top: 20px;
}

.score-message {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  background: #f0f0f0;
  padding: 10px;
  border-radius: 8px;
}

.pass-message {
  color: #28a745;
  font-weight: bold;
}

.fail-message {
  color: #dc3545;
  font-weight: bold;
}

.return-button {
  margin-top: 15px;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background: #007bff;
  color: white;
  cursor: pointer;
}

.return-button:hover {
  background: #0056b3;
}
</style>