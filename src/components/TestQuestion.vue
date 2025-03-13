<template>
  <div class="question-card">
    <div class="question-container">
    <span class="question-name">Câu {{ index }}</span>
    <span class="question-bar"></span>
  </div>
    <p v-html="question.detail"></p>
    <ul>
      <li>
        <label>
          <input type="radio" :name="'question-' + question.id" :value="question.choice1" v-model="selectedAnswer" @change="submitAnswer">
          {{ question.choice1 }}
        </label>
      </li>
      <li>
        <label>
          <input type="radio" :name="'question-' + question.id" :value="question.choice2" v-model="selectedAnswer" @change="submitAnswer">
          {{ question.choice2 }}
        </label>
      </li>
      <li>
        <label>
          <input type="radio" :name="'question-' + question.id" :value="question.choice3" v-model="selectedAnswer" @change="submitAnswer">
          {{ question.choice3 }}
        </label>
      </li>
      <li>
        <label>
          <input type="radio" :name="'question-' + question.id" :value="question.choice4" v-model="selectedAnswer" @change="submitAnswer">
          {{ question.choice4 }}
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    question: Object,
    index: Number,
  },
  data() {
    return {
      selectedAnswer: null
    };
  },
  methods: {
    submitAnswer() {
      this.$emit("answer-submitted", { id: this.question.id, answer: this.selectedAnswer });
    }
  }
};
</script>

<style scoped>
.question-card {
  padding: 8px;
  margin-bottom: 16px;
}
ul {
  list-style-type: none;
  padding: 0; 
  margin: 0; 
}

.question-container {
  display: flex;
  align-items: stretch;
}

.question-name {
  background-color: #fa0404;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  height: 30px;
  padding-inline: 5px;
}

.question-bar {
  flex-grow: 1;
  height: 30px;
  background-color: #7b7c7b;
}
</style>