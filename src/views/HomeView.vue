<template>
    <DailyQuestionPage :question="questionData"/>
    <ChatBot/>
  </template>
<script>
import DailyQuestionPage from '@/components/DailyQuestionPage.vue';
import ChatBot from '@/components/ChatBot.vue';
export default {
  components: {
    DailyQuestionPage, ChatBot,
  },
  data() {
  return {
    questionData: {
      type: "multiple_choices",
      detail: "Thủ đô của nước Pháp là?",
      choice1: "Berlin",
      choice2: "Madrid",
      choice3: "Paris",
      choice4: "Rome",
      answer: "Paris",
      picturePath: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/188px-Flag_of_France.svg.png",
    }
  };
}
};

</script>  
  