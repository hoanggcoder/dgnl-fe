<template>
    <NavBar/>
    <LoginPage/>
  </template>
<script>
import NavBar from '@/components/NavBar.vue';
import LoginPage from '@/components/LoginPage.vue';
export default {
  components: {
    NavBar, LoginPage
  }
};
</script>