<template>
    <div class="hangman-game">
      <h1>Chiếc nón kỳ diệu</h1>
  
      <div class="word-display">
        <div v-for="(letter, index) in targetWord.split('')" :key="index" class="letter-box">
          {{ guessedLetters.includes(letter) ? letter : '' }}
        </div>
      </div>
  
      <div class="wrong-guesses">
        <p>Sai: {{ wrongLetters.join(', ') }}</p>
        <p>Lượt đoán còn lại: {{ remainingGuesses }}</p>
      </div>
  
      <input
        v-model="currentLetter"
        @input="formatLetter"
        @keyup.enter="guessLetter"
        maxlength="1"
        :disabled="gameOver"
        placeholder="Nhập một chữ cái"
      />
      <button @click="guessLetter" :disabled="gameOver || !currentLetter">
        Đoán
      </button>
  
      <p v-if="gameOver">
        {{ isWinner ? 'Bạn đã tìm được từ bí ẩn' : 'Từ bí ẩn là : ' + targetWord }}
      </p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        targetWord: 'VIETNAM',
        guessedLetters: [],
        wrongLetters: [],
        currentLetter: '',
        maxWrong: 6,
        gameOver: false,
        isWinner: false
      };
    },
    computed: {
      remainingGuesses() {
        return this.maxWrong - this.wrongLetters.length;
      }
    },
    methods: {
      formatLetter() {
        this.currentLetter = this.currentLetter.toUpperCase().slice(0, 1);
      },
      guessLetter() {
        const letter = this.currentLetter.toUpperCase();
  
        if (!letter.match(/[A-Z]/) || this.guessedLetters.includes(letter) || this.wrongLetters.includes(letter)) {
          this.currentLetter = '';
          return;
        }
  
        if (this.targetWord.includes(letter)) {
          this.guessedLetters.push(letter);
        } else {
          this.wrongLetters.push(letter);
        }
  
        this.currentLetter = '';
  
        if (this.checkWin()) {
          this.gameOver = true;
          this.isWinner = true;
        } else if (this.wrongLetters.length >= this.maxWrong) {
          this.gameOver = true;
        }
      },
      checkWin() {
        return this.targetWord.split('').every(letter => this.guessedLetters.includes(letter));
      }
    }
  };
  </script>
  
  <style scoped>
  .hangman-game {
    max-width: 400px;
    margin: 30px auto;
    padding: 20px;
    text-align: center;
    font-family: Arial, sans-serif;
    background-color: #f3f7f0;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    color: #333;
    margin-bottom: 20px;
  }
  
  .word-display {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
  }
  
  .letter-box {
    width: 50px;
    height: 50px;
    border: 2px solid #ccc;
    margin: 0 4px;
    font-size: 24px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    border-radius: 6px;
    background-color: white;
  }
  
  input {
    width: 100%;
    max-width: 350px;
    padding: 10px;
    font-size: 16px;
    text-transform: uppercase;
    border: 2px solid #ccc;
    border-radius: 8px;
    margin-top: 10px;
    box-sizing: border-box;
  }
  
  button {
    margin-top: 15px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #1e88e5;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  button:hover {
    background-color: #1565c0;
  }
  button:disabled {
    background-color: #90a4ae;
    cursor: not-allowed;
  }
  
  .wrong-guesses {
    margin-bottom: 10px;
    color: #d32f2f;
  }
  </style>
  