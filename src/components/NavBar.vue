<template>
  <nav class="navbar">
    <div class="nav-left">
      <router-link to="/" @click="setActive('home')">
        <div class="logo"><img src="@/assets/logo_new2.png" alt="Logo" /></div>
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
        <router-link to="/review" @click="setActive('review')" :class="{ active: activeLink === 'review' }">Lý thuyết</router-link>
      </li>
      <li>
        <router-link to="/exam-list" @click="setActive('exam-list')" :class="{ active: activeLink === 'exam-list' }">Kỳ thi</router-link>
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
    <div class="user-info" @click="toggleDropdown">
        <img :src="user.avatar || defaultAvatar" alt="User Avatar" class="avatar" />
        <span class="username">{{ user.username }}</span>
    </div>
    <div class="dropdown-menu" :class="{ show: showDropdown }">
          <router-link :to="`/user-info/${user.username}`">Thông tin tài khoản</router-link>
          <router-link :to="`/user-score/${user.username}`">Quá trình luyện thi</router-link>
          <router-link :to="`/change-password/${user.username}`">Đổi mật khẩu</router-link>
    </div>
    <button @click="logout" class="logout-btn">Đăng xuất</button>
  </div>
  <div v-else>
    <button class="sign-in" @click="openLoginModal">Đăng nhập</button>
    <router-link to="/register" @click="noActive()"><button class="sign-up">Đăng ký</button></router-link>
  </div>
  </div>
  </nav>
  <LoginPage ref="loginModal" />
</template>

<script>
import defaultAvatar from "@/assets/avatar_default.png";
import LoginPage from "./loginPages/LoginPage.vue";
export default {
  name: "NavBar",
  components: {
    LoginPage,
  }
  ,
  data() {
    return {
      activeLink: '',
      user: null,
      defaultAvatar,
      role: null,
      showDropdown: false,
    };
  },
  mounted() {
    this.loadUser();
    window.addEventListener('userUpdated', this.loadUser);
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    window.removeEventListener('userUpdated', this.loadUser);
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    setActive(link) {
      this.activeLink = link;
    },
    noActive() {
      this.activeLink = '';
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
      localStorage.removeItem('id');
      this.user = null;
      this.role = null;
      window.dispatchEvent(new Event('userUpdated'));
      this.$router.push('/');
    },
    toggleDropdown(event) {
      this.activeLink = ''
      event.stopPropagation();
      this.showDropdown = !this.showDropdown;
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.showDropdown = false;
      }
    },
    openLoginModal() {
      this.$refs.loginModal.openModal();
    },
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 93vw;
  height: 60px;
  z-index: 1000;
}

.nav-left {
  display: flex;
  align-items: center;
}

.logo img {
  height: 50px;
  width: auto;
  border: #fff 1px solid;
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

.nav-links a:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
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
  justify-content: flex-end; 
  min-width: 200px;  
}

.user-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: auto;
  gap: 20px;
  cursor: pointer;
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
    width: 100%; 
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

.dropdown-menu {
  position: absolute;
  top: 115%;
  right: 42%;
  background: #066506;
  color: black;
  overflow: hidden;
  width: 180px;
  flex-direction: column;
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.2s ease-in-out, transform 0.2s ease;
  z-index: 1000;
  display: flex;
  pointer-events: none;
  border-radius: 10px;
}

.user-container .dropdown-menu.show {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.dropdown-menu a,
.dropdown-menu button {
  padding: 12px;
  text-align: left;
  background: #066506;
  border: none;
  color: #fff;
  cursor: pointer;
  text-decoration: none;
  width: 100%;
  transition: 0.3s;
  font-size: 14px;
}

.dropdown-menu a:hover,
.dropdown-menu button:hover {
  background: rgba(255, 255, 255, 0.3);
  color: #fff;
}

</style>