<template>
  <div class="question-container">
    <h2 class="question-title">Mỗi ngày một câu hỏi</h2>
    <p class="question-detail">{{ question.detail }}</p>

    <img 
      v-if="question.picturePath" 
      :src="question.picturePath" 
      alt="Question image" 
      class="question-image" 
    />

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
      <input 
        type="text" 
        v-model="selectedAnswer" 
        placeholder="Nhập câu trả lời của bạn..." 
        class="fill-input" 
      />
    </div>

    <button @click="submitAnswer" class="submit-btn">Trả lời</button>
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
      right: null,
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
        this.message = 'Vui lòng chọn hoặc nhập câu trả lời';
        return;
      }
      this.message = this.selectedAnswer === this.question.answer 
        ? '✅ Chính xác' 
        : '❌ Không chính xác. Hãy thử lại!';
      this.right = this.selectedAnswer === this.question.answer;
    },
  },
};
</script>

<style scoped>
.question-container {
  max-width: 600px;
  padding: 25px;
  border-radius: 12px;
  text-align: center;
  background: #f3f7f0;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease-in-out;
}

.question-container:hover {
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.question-title {
  font-size: 24px;
  font-weight: bold;
  color: #066506;
  margin-bottom: 15px;
}

.question-detail {
  font-size: 18px;
  color: #333;
  margin-bottom: 15px;
  line-height: 1.5;
}

.question-image {
  max-width: 100%;
  height: auto;
  margin: 15px 0;
  border-radius: 10px;
  border: 2px solid #ccc;
}

.choices-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.choice-button {
  padding: 12px;
  border: 2px solid #066506;
  background-color: white;
  color: #066506;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-weight: bold;
}

.choice-button.selected {
  background-color: #066506;
  color: white;
}

.choice-button:hover {
  background-color: #066506;
  color: white;
  transform: scale(1.05);
}

.fill-in {
  margin-bottom: 20px;
}

.fill-input {
  padding: 12px;
  width: 90%;
  border-radius: 25px;
  border: 2px solid #066506;
  font-size: 16px;
  text-align: center;
  outline: none;
}

.fill-input:focus {
  border-color: #044704;
}

.submit-btn {
  padding: 12px 20px;
  background-color: #066506;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 25px;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  width: 100%;
}

.submit-btn:hover {
  background-color: #044704;
  transform: scale(1.05);
}

.message {
  margin-top: 15px;
  font-weight: bold;
  font-size: 18px;
  padding: 10px;
  border-radius: 8px;
}

.message:contains("✅") {
  color: #066506;
  background: #d4edda;
}

.message:contains("❌") {
  color: #721c24;
  background: #f8d7da;
}
</style>
