<template>
  <div class="wordle-game">
    <h1>Trò chơi đoán từ</h1>

    <div v-for="(guess, index) in guesses" :key="index" class="guess-row">
      <div
        v-for="i in 5"
        :key="i"
        :class="getLetterClass(guess[i - 1], i - 1)"
        class="letter-box"
      >
        {{ guess[i - 1] || '' }}
      </div>
    </div>

    <div v-if="!gameOver && guesses.length < maxAttempts" class="guess-row">
      <div
        v-for="i in 5"
        :key="i"
        class="letter-box preview"
      >
        {{ currentGuess[i - 1] || '' }}
      </div>
    </div>

    <input
      v-model="currentGuess"
      @input="formatGuess"
      @keyup.enter="makeGuess"
      maxlength="5"
      :disabled="gameOver"
      placeholder="Nhập một từ tiếng Anh 5 chữ cái"
    />
    <button @click="makeGuess" :disabled="gameOver || currentGuess.length < 5">
      Xác nhận
    </button>

    <p v-if="gameOver">Từ cần tìm là {{ targetWord }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      targetWord: '', 
      guesses: [],
      currentGuess: '',
      maxAttempts: 6,
      gameOver: false,
      type: 'wordle', 
    };
  },
  mounted() {
    this.fetchTargetWord();
  },
  methods: {
    async fetchTargetWord() {
      try {
        this.type = 'wordle';
        const response = await axios.get(`http://localhost:8080/game/value/${this.type}`); 
        this.targetWord = response.data;  
      } catch (error) {
        console.error('Error fetching target word:', error);
      }
    },
    formatGuess() {
      this.currentGuess = this.currentGuess.toUpperCase().slice(0, 5);
    },
    makeGuess() {
      if (this.currentGuess.length === 5 && !this.gameOver) {
        this.guesses.push(this.currentGuess);
        if (this.currentGuess === this.targetWord) {
          this.gameOver = true;
        } else if (this.guesses.length >= this.maxAttempts) {
          this.gameOver = true;
        }
        this.currentGuess = '';
      }
    },
    getLetterClass(letter, index) {
      if (!letter) return '';
      if (this.targetWord[index] === letter) {
        return 'green';
      } else if (this.targetWord.includes(letter)) {
        return 'yellow';
      }
      return 'gray';
    }
  }
};
</script>



<style scoped>
.wordle-game {
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
  font-size: 24px;
  font-weight: bold;
  color: #066506;
  margin-bottom: 15px;
}

.guess-row {
  display: flex;
  justify-content: center;
  margin: 5px 0;
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
}

.green {
  background-color: #4caf50;
  color: white;
}
.yellow {
  background-color: #ffeb3b;
  color: black;
}
.gray {
  background-color: #9e9e9e;
  color: white;
}

input {
  width: 100%;
  max-width: 350px;
  padding: 10px;
  font-size: 16px;
  text-transform: uppercase;
  border: 2px solid #ccc;
  border-radius: 8px;
  margin-top: 15px;
  box-sizing: border-box;
}

button {
  margin-top: 15px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #066506;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
button:hover {
  background-color: #066506;
}
button:disabled {
  background-color: #7b7c7b;
  cursor: not-allowed;
}
</style>
