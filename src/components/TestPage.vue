<template>
    <div>
      <h1>Online Test</h1>
      <TestQuestion v-for="question in questions" :key="question.id" :question="question" @answer-submitted="handleAnswer"/>
      <button @click="submitTest">Finish Test</button>
    </div>
</template>
  
<script>
  import TestQuestion from "@/components/TestQuestion.vue";
  
  export default {
    components: { TestQuestion },
    data() {
      return {
        questions: [],
        answers: {}
      };
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
      }
    }
  };
</script>
  
<style>
  h1 {
    text-align: center;
  }
</style>