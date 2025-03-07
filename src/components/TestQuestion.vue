<template>
  <div class="question-card">
    <div class="question-container">
      <span class="question-name">{{question.title}}</span>
      <span class="question-bar"></span>
    </div>
    <p v-html="question.content"></p>
    <ul>
      <li v-for="(option, index) in question.options" :key="index">
        <label>
          <input type="radio" :name="'question-' + question.id" :value="option" v-model="selectedAnswer" @change="submitAnswer">
          {{ option }}
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    question: Object
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