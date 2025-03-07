<template>
  <div class="auth-container">
    <div class="card">
      <h2>{{ isLogin ? 'Login' : 'Sign Up' }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="input-group">
          <label>Username:</label>
          <input type="text" v-model="username" required />
        </div>
        <div class="input-group">
          <label>Password:</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit">{{ isLogin ? 'Login' : 'Sign Up' }}</button>
      </form>
      <p @click="toggleMode" class="toggle">{{ isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login" }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: true,
      username: '',
      password: ''
    };
  },
  methods: {
    toggleMode() {
      this.isLogin = !this.isLogin;
    },
    handleSubmit() {
      if (this.isLogin) {
        console.log('Logging in with:', this.username, this.password);
      } else {
        console.log('Signing up with:', this.username, this.password);
      }
    }
  }
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f4f4f4;
  text-align: center;
}
.card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 320px;
}
.input-group {
  margin: 15px 0;
  text-align: left;
}
label {
  display: block;
  font-weight: bold;
}
input {
  width: 100%;
  padding-top: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: left;
}
button {
  background: #066506;
  color: white;
  border: none;
  padding: 10px;
  width: 100%;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
.toggle {
  margin-top: 10px;
  color: #066506;
  cursor: pointer;
  text-align: center;
  font-weight: bold;
}
</style>