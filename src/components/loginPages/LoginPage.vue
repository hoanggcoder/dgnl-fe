<template>
  <div>
    <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="card">
        <h2>Đăng nhập</h2>
        <form @submit.prevent="handleSubmit">
          <div class="input-group">
            <label>Username:</label>
            <input type="text" v-model="username" required />
          </div>
          <div class="input-group">
            <label>Mật khẩu:</label>
            <input type="password" v-model="password" required />
          </div>
          <button type="submit" :disabled="loading">{{ loading ? 'Đang đăng nhập' : 'Đăng nhập' }}</button>
          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </form>
        <p class="toggle" v-if="this.needRegister"><router-link to="/register" @click="closeModal">Đăng ký nếu chưa có tài khoản</router-link></p>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      errorMessage: '',
      isModalOpen: false,
      needRegister: true, 
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
      document.body.classList.add('modal-open');
    },
    openModalWithInfo(username) {
      this.isModalOpen = true;
      this.username = username;
      this.needRegister = false;
      document.body.classList.add('modal-open');
    },
    closeModal() {
      this.isModalOpen = false;
      document.body.classList.remove('modal-open'); 
    },
    async handleSubmit() {
      this.loading = true;
      this.errorMessage = '';

      try {
        const response_auth = await axios.post('http://localhost:8080/auth/login', {
          username: this.username,
          password: this.password,
        });

        const response_user = await axios.get(`http://localhost:8080/user/get-by-username/${this.username}`);

        localStorage.setItem('token', response_auth.data);
        localStorage.setItem('username', response_user.data.username);
        localStorage.setItem('role', response_user.data.role);
        localStorage.setItem('user', JSON.stringify(response_user.data));
        localStorage.setItem('id', response_user.data.id);
        window.dispatchEvent(new Event('userUpdated'));
        this.$router.push('/');
        this.isModalOpen = false;
        document.body.classList.remove('modal-open');
        this.username = '';
        this.password = '';
      } catch (error) {
        this.errorMessage = 'Thông tin đăng nhập không chính xác!';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>

.card {
  background: #f3f7f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 320px;
  z-index: 10;
}

.input-group {
  margin: 15px 0;
  text-align: left;
  padding-right: 20px;
}

label {
  display: block;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
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

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}

.toggle {
  margin-top: 10px;
  color: #066506;
  cursor: pointer;
  font-weight: bold;
}

.toggle a {
  text-decoration: none;
  color: #066506;
  font-weight: bold;
}

.open-login-btn {
  background: #066506;
  color: white;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 20px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

body.modal-open {
  filter: blur(5px);
}
</style>
