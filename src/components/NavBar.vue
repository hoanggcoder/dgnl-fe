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
      <li>
        <router-link to="/about" @click="setActive('about')" :class="{ active: activeLink === 'about' }">Về Website</router-link>
      </li>
    </ul>

    
    <div class="nav-buttons">
      <router-link to="/login"><button class="sign-in" @click="setActive('login')">Đăng nhập</button></router-link>
      <router-link to="/register"><button class="sign-up" @click="setActive('register')">Đăng ký</button></router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      activeLink: '',
    };
  },
  methods: {
    setActive(link) {
      this.activeLink = link;
    },
  },
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
  gap: 15px;
}

.sign-in, .sign-up {
  background: #7b7c7b;
  border: none;
  color: white;
  padding: 8px 20px;
  border-radius: 20px;
  cursor: pointer;
}

.sign-in:hover, .sign-up:hover {
  opacity: 0.8;
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
    margin-top: 10px;
  }
}
</style>