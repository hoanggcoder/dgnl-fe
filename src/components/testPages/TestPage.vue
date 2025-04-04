<template>
  <div class="test-container">
    <div :class="{ 'blur-content': score !== null }" class="test-content">
      <h1 class="exam-name">{{ this.$route.query.examName }}</h1>

      <TestQuestion
        v-for="(question, index) in questions"
        :key="question.id"
        :question="question"
        :index="index + 1"
        :id="'question-' + index"
        @answer-submitted="handleAnswer"
      />
    </div>

    <aside :class="{ 'blur-aside': score !== null }" class="question-tracker">
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

    <div v-if="score !== null">
      <div class="overlay"></div>
      <div class="score-container">
        <canvas v-if="passed" ref="confettiCanvas" class="confetti"></canvas>
        <p class="score-message">
          Bạn đã đạt được <strong>{{ parseFloat(score).toFixed(2) }}</strong> điểm!
        </p>
        <p v-if="passed" class="pass-message">Bạn đã vượt qua bài kiểm tra</p>
        <p v-else class="fail-message">Bạn chưa vượt qua mức điểm yêu cầu</p>
        <button @click="goToExam" class="return-button">Quay lại trang thông tin bài thi</button>
      </div>
    </div>
  </div>
</template>
  
<script>
import QuestionTracker from "@/components/testPages/QuestionTracker.vue";
import TestQuestion from "@/components/questionPages/TestQuestion.vue";
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
    window.addEventListener("beforeunload", this.handleBeforeUnload);
  },
  beforeUnmount() {
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
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
    },
    handleBeforeUnload(event) {
      if (!this.score) {
        this.submitTest();
        event.preventDefault();
        event.returnValue = "";
      }
    },
    async submitTest() {
      if (this.score !== null) return;
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
.exam-name {
  text-align: center;
}
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
  padding: 15px;
  background: #f9f9f9;
  position: fixed;
  right: 0;
  top: 0;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: filter 0.3s ease-in-out;
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
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.3);
  width: 400px;
  max-width: 90%;
  animation: fadeIn 0.5s ease-in-out;
  z-index: 1001;
}

.score-message {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  padding: 15px;
  border-radius: 8px;
}

.blur-content, .blur-aside {
  filter: blur(5px);
  pointer-events: none;
}

.pass-message {
  color: #28a745;
  font-size: 22px;
  font-weight: bold;
  background: rgba(40, 167, 69, 0.1);
  padding: 10px;
  border-radius: 8px;
}

.fail-message {
  color: #dc3545;
  font-size: 22px;
  font-weight: bold;
  background: rgba(220, 53, 69, 0.1);
  padding: 10px;
  border-radius: 8px;
}

.return-button {
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  background: #066506;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.return-button:hover {
  transform: scale(1.05);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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