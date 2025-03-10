<template>
    <NavBar/>
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
    </div>
    <DailyQuestionPage :question="questionData"/>
  </template>
<script>
import NavBar from '@/components/NavBar.vue';
import DailyQuestionPage from '@/components/DailyQuestionPage.vue';
export default {
  components: {
    NavBar, DailyQuestionPage
  },
  data() {
  return {
    questionData: {
      type: "multiple_choices",
      detail: "What is the capital of France?",
      choice1: "Berlin",
      choice2: "Madrid",
      choice3: "Paris",
      choice4: "Rome",
      answer: "Paris",
      picturePath: "https://example.com/paris.jpg",
    }
  };
}
};

</script>  
  