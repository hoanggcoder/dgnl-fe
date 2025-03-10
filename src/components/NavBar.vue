<template>
  <nav class="navbar">
    <router-link to="/">
      <div class="logo"><img src="@/assets/logo.png" alt="Logo" /></div>
    </router-link>

    <ul class="nav-links">
      <li>
        <router-link to="/" @click="setActive('home')" :class="{ active: activeLink === 'home' }">Trang chủ</router-link>
      </li>
      <li>
        <a href="#" @click.prevent="setActive('de-thi')" :class="{ active: activeLink === 'de-thi' }">Đề thi</a>
      </li>
      <li>
        <a href="#" @click.prevent="setActive('sinh-de-thi')" :class="{ active: activeLink === 'sinh-de-thi' }">Sinh đề thi</a>
      </li>
      <li>
        <router-link to="/about" @click="setActive('about')" :class="{ active: activeLink === 'about' }">Về Website</router-link>
      </li>
    </ul>

    <div class="nav-buttons">
      <router-link to="/login"><button class="sign-in" @click="setActive('login')">Sign In</button></router-link>
      <router-link to="/register"><button class="sign-up" @click="setActive('register')">Sign Up</button></router-link>
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

.logo {
  height: 10%;
  width: 10%;
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
  transition: opacity 0.3s;
}

.nav-links a.active {
  border: 2px solid white;
  padding: 6px 10px;
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