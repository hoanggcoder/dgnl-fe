<template>
  <div>
    <NavBar />
    <TestPage/>
    <Chatbot/>
    <LoginPage />
  </div>
</template>

<script>

import LoginPage from "./components/LoginPage.vue";
import TestPage from "./components/TestPage.vue";
import Chatbot from "./components/ChatBot.vue";
import NavBar from "./components/NavBar.vue";

export default {
  components: {
     LoginPage, TestPage, Chatbot, NavBar
  }
};
</script>

<style>
h1 {
  text-align: center;
}
</style>