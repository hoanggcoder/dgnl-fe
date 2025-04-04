<template>
  <div class="tracker-container">
    <h3>Danh sách câu hỏi</h3>
    <div class="tracker-grid">
      <button
        v-for="(question, index) in questions"
        :key="index"
        @click="scrollToQuestion(index)" 
        @contextmenu.prevent="toggleReviewMark(index, $event)"
        :class="{
          'answered': answers[question.id] && !markedForReview.includes(index),
          'marked': markedForReview.includes(index) && !answers[question.id],
          'half-marked': markedForReview.includes(index) && answers[question.id],
        }">
        {{ index + 1 }}
      </button>
    </div>
  </div>
</template>
  
<script>
export default {
  props: {
    questions: Array,
    answers: Object,
  },
  data() {
    return {
      markedForReview: [],
    };
  },
  methods: {
    scrollToQuestion(index) {
    const element = document.getElementById(`question-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    },
    toggleReviewMark(questionId, event) {
      event.preventDefault();

      if (this.markedForReview.includes(questionId)) {
        if (this.answers[questionId]) {
          this.markedForReview = this.markedForReview.filter(id => id !== questionId);
        } else {
          this.markedForReview = this.markedForReview.filter(id => id !== questionId);
        }
      } else {
        this.markedForReview.push(questionId);
      }
    },
  },
};
</script>
  
<style scoped>
.tracker-container {
  background: #7b7c7b;
  backdrop-filter: blur(10px);
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-bottom: 20px;
}

.tracker-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30px, 1fr)); 
  gap: 5px;
  margin: 10px 0;
}

button {
  padding: 6px;
  font-size: 12px; 
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s ease;
}

.answered {
  background: #28a745;
  color: white;
}

.marked {
  background: #ffc107;
  color: black;
}

.half-marked {
  background: linear-gradient(to right, #ffc107 50%, #28a745 50%);
  color: black;
}
</style>
  