<template>
    <nav class="navbar">

      <router-link to="/"><div class="logo"><img src="@/assets/logo.png" alt="Logo" /></div></router-link>
    
      <ul class="nav-links">
        <li><a href="#">Trang chủ</a></li>
        <li><a href="#">Thông tin</a></li>
        <li><a href="#">Đề thi</a></li>
        <li><a href="#">Sinh đề thi</a></li>
        <li><router-link to="/about">Về Website</router-link></li>
      </ul>
  
      <div class="nav-buttons">
        <button class="sign-in">Sign In</button>
        <button class="sign-up">Sign Up</button>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: "NavBar",
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
  
  .nav-links a:hover {
    opacity: 0.7;
  }
  
  .nav-buttons {
    display: flex;
    gap: 15px;
  }
  
  .sign-in {
    background: transparent;
    border: 2px solid white;
    color: white;
    padding: 8px 20px;
    border-radius: 20px;
    cursor: pointer;
  }
  
  .sign-up {
    background: #7b7c7b;
    border: none;
    color: white;
    padding: 8px 20px;
    border-radius: 20px;
    cursor: pointer;
  }
  
  .sign-in:hover,
  .sign-up:hover {
    opacity: 0.8;
  }
  
  /* Responsive */
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