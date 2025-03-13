<template>
  <div>
    <h1>Test</h1>
    <TestQuestion 
      v-for="(question, index) in questions" 
      :key="question.id" 
      :question="question" 
      :index="index + 1"
      @answer-submitted="handleAnswer"
    />
    <button @click="submitTest">Finish Test</button>
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
        answers: {}
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
        } catch (error) {
          console.error("Error fetching test:", error);
        }
      },
    }
  };
</script>
  
<style>
  h1 {
    text-align: center;
  }
</style>