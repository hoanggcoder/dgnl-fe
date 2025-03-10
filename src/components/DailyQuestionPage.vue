<template>
  <div class="question-container">
    <h2 class="question-title">Question of the Day</h2>
    <p class="question-detail">{{ question.detail }}</p>

    <img v-if="question.picturePath" :src="question.picturePath" alt="Question image" class="question-image" />

    <div v-if="question.type === 'multiple_choices'" class="choices-grid">
      <button
        v-for="(choice, index) in choices"
        :key="index"
        @click="selectedAnswer = choice"
        :class="['choice-button', { 'selected': selectedAnswer === choice }]"
      >
        {{ choice }}
      </button>
    </div>

    <div v-if="question.type === 'fill_in'" class="fill-in">
      <input type="text" v-model="selectedAnswer" placeholder="Type your answer..." class="fill-input" />
    </div>

    <button @click="submitAnswer" class="submit-btn">Submit</button>
    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    question: Object,
  },
  data() {
    return {
      selectedAnswer: '',
      message: '',
    };
  },
  computed: {
    choices() {
      return [this.question.choice1, this.question.choice2, this.question.choice3, this.question.choice4];
    },
  },
  methods: {
    submitAnswer() {
      if (!this.selectedAnswer) {
        this.message = 'Please select an answer!';
        return;
      }
      this.message = this.selectedAnswer === this.question.answer ? 'Correct! 🎉' : 'Incorrect. Try again! ❌';
    },
  },
};
</script>

<style scoped>
.question-container {
  max-width: 450px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  background: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.question-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 15px;
}

.question-detail {
  font-size: 18px;
  margin-bottom: 10px;
}

.question-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
  border-radius: 8px;
}

.choices-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 15px;
}

.choice-button {
  padding: 10px 20px;
  border: 2px solid #007bff;
  background-color: white;
  color: #007bff;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.choice-button.selected {
  background-color: #28a745;
  color: white;
  border-color: #28a745;
}

.choice-button:hover {
  background-color: #007bff;
  color: white;
}

.fill-input {
  padding: 10px;
  width: 80%;
  border-radius: 20px;
  border: 1px solid #ccc;
}

.submit-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  transition: 0.3s ease-in-out;
}

.submit-btn:hover {
  background-color: #0056b3;
}

.message {
  margin-top: 10px;
  font-weight: bold;
}
</style>