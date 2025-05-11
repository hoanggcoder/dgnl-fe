<template>
    <div class="game-editor">
      <h2>Quản lý Minigame</h2>
  
      <div class="game-type-selector">
        <button @click="selectType('wordle')" :class="{ active: selectedType === 'wordle' }">Wordle</button>
        <button @click="selectType('hangman')" :class="{ active: selectedType === 'hangman' }">Hangman</button>
      </div>
  
      <div class="value-display">
        <p>{{ gameValue }}</p>
      </div>
  
      <div class="value-update">
        <input v-model="newValue" placeholder="Nhập một từ khác" />
        <button @click="updateValue">Xác nhận</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import axios from 'axios';
  
  const selectedType = ref('wordle');
  const gameValue = ref('');
  const newValue = ref('');
  
  onMounted(() => {
    fetchValue();
  });
  
  async function fetchValue() {
    try {
      const res = await axios.get(`http://localhost:8080/game/value/${selectedType.value}`);
      gameValue.value = res.data.toUpperCase(); 
    } catch (err) {
      console.error('Failed to fetch game value:', err);
    }
  }
  
  async function updateValue() {
    try {
      const upperCaseValue = newValue.value.toUpperCase();
      await axios.put(`http://localhost:8080/game/value/${selectedType.value}`, upperCaseValue, {
        headers: { 'Content-Type': 'text/plain' },
      });
      fetchValue();
      newValue.value = '';
      alert('Cập nhật thành công!');
    } catch (err) {
      console.error('Failed to update game value:', err);
      alert('Cập nhật thất bại!');
    }
  }
  
  function selectType(type) {
    selectedType.value = type;
    fetchValue();
  }
  
  watch(newValue, (val) => {
    newValue.value = val.toUpperCase();
  });
  </script>
  
  <style scoped>
  .game-editor {
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 15px;
    max-width: 400px;
    margin: 80px auto;
    background: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .game-type-selector {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .game-type-selector button {
    padding: 10px 16px;
    border: 2px solid #066506;
    background: white;
    color: #066506;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  h2{
    font-size: 24px;
    font-weight: bold;
    color: #066506;
    text-align: center;
  }
  
  .game-type-selector button:hover {
    background: #e6f4e6;
  }
  
  .game-type-selector button.active {
    background: #066506;
    color: white;
  }
  
  .value-display {
    margin-top: 20px;
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
  }
  
  .value-update {
    margin-top: 20px;
    text-align: center;
  }
  
  .value-update input {
    padding: 8px 12px;
    width: 70%;
    border: 1px solid #ccc;
    border-radius: 8px;
    outline: none;
    transition: border 0.2s;
  }
  
  .value-update input:focus {
    border-color: #066506;
  }
  
  .value-update button {
    padding: 8px 14px;
    margin-top: 20px;
    background: #066506;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    margin-left: 8px;
    transition: background-color 0.3s ease;
  }
  
  .value-update button:hover {
    background: #044704;
  }
  </style>
  