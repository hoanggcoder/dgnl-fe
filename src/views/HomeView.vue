<template>
  <div class="page-container">
    <div class="slider-container">
      <button @click="prevSlide">&#10094;</button>
      <div class="card-container">
        <CardPage
          v-for="(card, index) in visibleCards"
          :key="index"
          :title="card.title"
          :description="card.description"
          :thumbnail="card.thumbnail"
          :tags="card.tags"
        />
      </div>
      <button @click="nextSlide">&#10095;</button>
    </div>
    
    <DailyQuestionPage v-if="questionData" :question="questionData"/>
    <ChatBot/>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import CardPage from '@/components/CardPage.vue';
import DailyQuestionPage from '@/components/DailyQuestionPage.vue';
import ChatBot from '@/components/ChatBot.vue';

const cards = ref([
  {
    title: "Vue Card Example",
    description: "This is a simple Vue card.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/188px-Flag_of_France.svg.png",
    tags: ["Vue", "No Tailwind", "Component"]
  },
  {
    title: "Second Card",
    description: "Another card with a different image.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/188px-Flag_of_France.svg.png",
    tags: ["Technology", "UI"]
  },
  {
    title: "Third Card",
    description: "This is the third card.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/188px-Flag_of_France.svg.png",
    tags: ["Vue", "Example", "Web"]
  },
  {
    title: "Fourth Card",
    description: "This is the fourth card.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/188px-Flag_of_France.svg.png",
    tags: ["Coding", "Frontend"]
  },
  {
    title: "Fifth Card",
    description: "This is the fifth card.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/188px-Flag_of_France.svg.png",
    tags: ["Web", "Development"]
  }
]);

const questionData = ref({
  type: "multiple_choices",
  detail: "Thủ đô của nước Pháp là?",
  choice1: "Berlin",
  choice2: "Madrid",
  choice3: "Paris",
  choice4: "Rome",
  answer: "Paris",
  picturePath: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/188px-Flag_of_France.svg.png",
});

const currentIndex = ref(0);
const visibleCards = computed(() => {
  const start = currentIndex.value;
  return [...cards.value, ...cards.value].slice(start, start + 3);
});

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % cards.value.length;
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + cards.value.length) % cards.value.length;
};
</script>

<style scoped>
.page-container {
  padding-left: 50px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.slider-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.card-container {
  display: flex;
  gap: 10px;
  overflow: hidden;
  width: 100%;
  justify-content: center;
}

.card {
  flex: 1;
  max-width: 400px;
  min-width: 300px;
}

button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 10px;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
