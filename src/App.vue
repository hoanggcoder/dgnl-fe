<template>
  <NavBar/>
  <div class="content">
    <router-view></router-view>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue';
export default {
  components: {
    NavBar
  }
}
</script>

<style>
.content {
  padding-top: 70px; 
}

body {
  font-family: 'Helvetica', sans-serif;
}
</style>