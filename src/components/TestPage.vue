<template>
  <div class="test-container">
    <div class="test-content">
      <h1>{{ this.$route.query.examName }}</h1>

      <div :class="{ 'blur-content': score !== null }">
        <TestQuestion
          v-for="(question, index) in questions"
          :key="question.id"
          :question="question"
          :index="index + 1"
          :id="'question-' + index"
          @answer-submitted="handleAnswer"
        />
      </div>

      <div v-if="score !== null" class="score-container">
        <p class="score-message">
          Bạn đã đạt được <strong>{{ parseFloat(score).toFixed(2) }}</strong> điểm!
        </p>
        <p v-if="passed" class="pass-message">🎉 Chúc mừng! Bạn đã vượt qua bài kiểm tra! 🎉</p>
        <p v-else class="fail-message">❌ Rất tiếc! Bạn chưa đạt điểm yêu cầu. ❌</p>
        <button @click="goToExam" class="return-button">Quay lại trang cuộc thi</button>
      </div>
    </div>

    <aside class="question-tracker">
      <CountdownTimer v-if="timeLimit !== null" :timeLimit="timeLimit" @time-up="handleTimeUp" />
      <div class="button-container">
          <button @click="submitTest" class="submit-button">Nộp bài</button>
      </div>
      <QuestionTracker
        :questions="questions"
        :answers="answers"
        @get-current-question="getCurrentQuestion"
      />
    </aside>
  </div>
</template>
  
<script>
import QuestionTracker from "@/components/QuestionTracker.vue";
import TestQuestion from "@/components/TestQuestion.vue";
import CountdownTimer from "./CountdownTimer.vue";
import axios from "axios";

export default {
  components: { TestQuestion, QuestionTracker, CountdownTimer },
  data() {
    return {
      questions: [],
      answers: {},
      test: null,
      currentQuestionId: null,
      markedForReview: [],
      answerInput: {
        testId: this.$route.params.id,
        answerList: "",
        userId: localStorage.getItem("id"),
      },
      score: null,
      examId: this.$route.query.examId || null,
      scoreToPass: 0,
      timeLimit: null,
      passed: false,
    };
  },
  created() {
    this.fetchTest();
  },
  methods: {
    handleAnswer({ id, answer }) {
      this.answers[id] = answer;
      this.currentQuestionId = id;
    },
    getCurrentQuestion() {
      return this.currentQuestionId;
    },
    goToExam() {
      if (this.examId) {
        this.$router.push(`/exam/${this.examId}`);
      }
    },
    handleTimeUp() {
    alert("⏳ Time's up! Submitting test...");
    this.submitTest();
    }
    ,
    async submitTest() {
      const formattedAnswers = this.questions
        .map(
          (question, index) => `Q${index + 1}=${this.answers[question.id] || ""};`
        )
        .join("");
      this.answerInput.answerList = formattedAnswers;
      try {
        const response = await axios.post(
          `http://localhost:8080/test/answer-test`,
          this.answerInput,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        this.score = response.data.score;
        this.passed = this.score >= this.scoreToPass;
      } catch (error) {
        console.error("Error submitting test:", error);
      }
    },
    async fetchTest() {
      const testId = this.$route.params.id;
      try {
        const response = await axios.get(`http://localhost:8080/test/${testId}`);
        this.test = response.data;
        this.timeLimit = this.test.timeLimit;
        this.questions = this.test.questionList;
        this.scoreToPass = this.test.scoreToPass;
      } catch (error) {
        console.error("Error fetching test:", error);
      }
    },
  },
};
</script>
  
<style scoped>
.test-container {
  display: flex;
  width: 100%;
  height: 100vh; 
}

.test-content {
  width: 80%;
  height: 100vh;
  padding: 20px;
  border-radius: 8px;
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto; 
}

.question-tracker {
  width: 20%;
  height: 100vh;
  padding: 10px;
  background: #f9f9f9;
  position: fixed;
  right: 0;
  top: 0;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  margin-bottom: 20px;
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
  background: #066506;
  color: white;
  cursor: pointer;
}

.return-button:hover {
  background: #044404;
}

@media (max-width: 900px) {
  .test-container {
    flex-direction: column;
  }
  .test-content {
    width: 100%;
  }
  .question-tracker {
    width: 100%;
    height: auto;
    position: relative;
    border-left: none;
    box-shadow: none;
  }
}
</style>