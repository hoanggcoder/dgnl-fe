<template>
  <nav class="navbar">
    <div class="nav-left">
      <router-link to="/">
        <div class="logo"><img src="@/assets/hsa_logo.png" alt="Logo" /></div>
      </router-link>
    </div>

    <ul class="nav-links">
      <li>
        <router-link to="/" @click="setActive('home')" :class="{ active: activeLink === 'home' }">Trang chủ</router-link>
      </li>
      <li>
        <router-link to="/article-list" @click="setActive('article-list')" :class="{ active: activeLink === 'article-list' }">Thông tin</router-link>
      </li>
      <li>
        <router-link to="/exam-list" @click="setActive('exam-list')" :class="{ active: activeLink === 'exam-list' }">Đề thi</router-link>
      </li>
      <li>
        <router-link to="/create-question" @click="setActive('create-question')" :class="{ active: activeLink === 'create-question' }">Sinh câu hỏi</router-link>
      </li>
      <li v-if = "role !== 'admin'">
        <router-link to="/about" @click="setActive('about')" :class="{ active: activeLink === 'about' }">Về Website</router-link>
      </li>
      <li v-if = "role === 'admin'">
        <router-link to="/manage" @click="setActive('manage')" :class="{ active: activeLink === 'manage' }">Quản lý</router-link>
      </li>
    </ul>

    <div class="nav-buttons">
  <div v-if="user" class="user-container">
    <div class="user-info">
        <img :src="user.avatar || defaultAvatar" alt="User Avatar" class="avatar" />
      <router-link :to="`/user-info/${user.username}`" @click="noActive()">
        <span class="username">{{ user.username }}</span>
      </router-link>
    </div>
    <button @click="logout" class="logout-btn">Đăng xuất</button>
  </div>
  <div v-else>
    <router-link to="/login" @click="noActive()"><button class="sign-in">Đăng nhập</button></router-link>
    <router-link to="/register" @click="noActive()"><button class="sign-up">Đăng ký</button></router-link>
  </div>
  </div>
  </nav>
</template>

<script>
import defaultAvatar from "@/assets/avatar_default.png";
export default {
  name: "NavBar",
  data() {
    return {
      activeLink: '',
      user: null,
      defaultAvatar,
      role: null,
    };
  },
  mounted() {
    this.loadUser();
    window.addEventListener('userUpdated', this.loadUser);
  },
  beforeUnmount() {
    window.removeEventListener('userUpdated', this.loadUser);
  },
  methods: {
    setActive(link) {
      this.activeLink = link;
    },
    noActive() {
      this.activeLink = '';
      console.log('a' + this.activeLink);
    }
    ,
    loadUser() {
      const storedUser = localStorage.getItem('user');
      this.user = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
      const storedRole = localStorage.getItem('role');
      this.role = storedRole && storedRole !== "undefined" ? storedRole : null;
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      localStorage.removeItem('username');
      this.user = null;
      this.role = null;
      window.dispatchEvent(new Event('userUpdated'));
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #066506;
  padding: 15px 50px;
  color: white;
  font-family: Arial, sans-serif;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 93vw;
  z-index: 1000;
}

.nav-left {
  display: flex;
  align-items: center;
}

.logo img {
  height: 50px;
  width: auto;
}

.nav-links {
  display: flex;
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-links a {
  text-decoration: none;
  color: white;
  font-size: 14px;
  padding: 10px 15px;
  position: relative;
  transition: all 0.3s ease;
}

.nav-links a.active::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -3px;
  height: 3px;
  background-color: white;
  border-radius: 2px;
}

.nav-buttons {
  display: flex;
  align-items: center;
}

.user-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%; 
  gap: 20px; 
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px; 
  background: rgba(255, 255, 255, 0.2);
  padding: 5px 10px;
  border-radius: 25px;
  transition: 0.3s ease;
  height: 50px;
  width: auto; 
  flex-direction: row; 
  justify-content: flex-start;
  white-space: nowrap; 
}

.user-info:hover {
  background: rgba(255, 255, 255, 0.3);
}

.user-info a {
  text-decoration: none;
  color: white;
  font-weight: bold;
}

.avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;
  flex-shrink: 0; 
}

.username {
  font-weight: bold;
  color: white;
  font-size: 16px;
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0;
  padding: 0;
}

.logout-btn {
  background: #7b7c7b;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 14px;
  transition: 0.3s ease, transform 0.2s ease;
  margin: 0 5px;
}


.sign-in, .sign-up {
  background: #7b7c7b;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 14px;
  transition: 0.3s ease, transform 0.2s ease;
  margin: 0 5px;
}

.sign-in:hover, .sign-up:hover {
  background: #5e5f5e;
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    text-align: center;
  }

  .nav-links {
    flex-direction: column;
    gap: 10px;
  }

  .nav-buttons {
    flex-direction: column;
    gap: 15px;
    margin-top: 10px;
  }

  .user-info {
    flex-direction: column;
    gap: 10px;
    padding: 10px;
  }

  .logout-btn {
    width: 100%;
    text-align: center;
  }
}
</style>