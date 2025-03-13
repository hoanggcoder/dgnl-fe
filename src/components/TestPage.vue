<template>
  <div>
    <h1>{{this.$route.query.examName}}</h1>
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
      };
    },
    created() {
    this.fetchTest();
    },
    methods: {
      handleAnswer({ id, answer }) {
        this.answers[id] = answer; 
      },
      submitTest() {
        const formattedAnswers = Object.entries(this.answers)
          .map(([id, answer]) => `Q${id}=${answer};`)
          .join("");

        console.log(formattedAnswers);
      },
      async fetchTest() {
        const testId = this.$route.params.id;
        try {
          const response = await axios.get(`http://localhost:8080/test/${testId}`);
          this.questions = response.data.questionList;
          this.test = response.data;
        } catch (error) {
          console.error("Error fetching test:", error);
        }
      },
    }
  };
</script>
  
<style scoped>
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
</style>