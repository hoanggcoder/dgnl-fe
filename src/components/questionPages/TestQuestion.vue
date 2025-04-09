<template>
  <div class="question-card">
    <div class="question-container">
      <span class="question-name">Câu {{ index }}</span>
      <span class="question-bar"></span>
    </div>

    <div ref="detailContainer" v-html="question.detail"></div>

    <div v-if="question.type === 'fill_in'">
      <input
        type="text"
        v-model="selectedAnswer"
        :placeholder="showPlaceholder ? 'Nhập đáp án...' : ''"
        @focus="handleFocus"
        @input="submitAnswer"
        :class="{ white: hasFocused }"
        class="fill-in-input"
      />
    </div>

    <ul v-else>
      <li v-for="(choice, idx) in choices" :key="idx">
        <label>
          <input
            type="radio"
            :name="'question-' + question.id"
            :value="choice"
            v-model="selectedAnswer"
            @change="submitAnswer"
          >
          ({{ choiceLabels[idx] }}) {{ choice }}
        </label>
      </li>
    </ul>

  </div>
</template>

<script>
import 'katex/dist/katex.min.css'
import renderMathInElement from 'katex/contrib/auto-render'

export default {
  props: {
    question: Object,
    index: Number,
  },
  data() {
    return {
      selectedAnswer: null,
      choiceLabels: ['A', 'B', 'C', 'D'],
      hasFocused: false,
    };
  },
  computed: {
    choices() {
      return [
        this.question.choice1,
        this.question.choice2,
        this.question.choice3,
        this.question.choice4,
      ].filter(choice => choice);
    },
    showPlaceholder() {
      return this.hasFocused;
    }
  },
  watch: {
    question: {
      immediate: true,
      handler() {
        this.renderQuestionDetail();
      }
    }
  },
  mounted() {
    this.renderQuestionDetail();
  },
  methods: {
    handleFocus() {
      this.hasFocused = true;
    },
    submitAnswer() {
      if (this.selectedAnswer !== null && this.selectedAnswer !== "") {
        this.$emit("answer-submitted", { id: this.question.id, answer: this.selectedAnswer });
      }
    },
    renderQuestionDetail() {
      this.$nextTick(() => {
        if (this.$refs.detailContainer) {
          renderMathInElement(this.$refs.detailContainer, {
            delimiters: [
              {left: "\\(", right: "\\)", display: false},
              {left: "\\[", right: "\\]", display: true}
            ],
            throwOnError: false, 
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.question-card {
  padding: 8px;
  margin-bottom: 16px;
  margin-right: 30px;
}
ul {
  list-style-type: none;
  padding: 0; 
  margin: 0; 
}
.question-container {
  display: flex;
  align-items: stretch;
  margin-bottom: 8px;
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

.fill-in-input {
  width: 20%;
  margin: 8px auto 0 auto; 
  display: block;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #7b7c7b; 
  color: #7b7c7b; 
  caret-color: black; 
  transition: background-color 0.3s, color 0.3s;
}

.fill-in-input.white {
  background-color: #fff;
  color: black;
  border: 1px solid #14a614;
}
</style>
