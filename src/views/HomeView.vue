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
          :link="card.link"
        />
      </div>
      <button @click="nextSlide">&#10095;</button>
    </div>
    
    <DailyQuestionPage v-if="questionData" :question="questionData"/>
    <ChatBot/>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import CardPage from '@/components/CardPage.vue';
import DailyQuestionPage from '@/components/DailyQuestionPage.vue';
import ChatBot from '@/components/ChatBot.vue';

const cards = ref([
  {
    title: "Giới thiệu về kỳ thi ĐGNL",
    description: "Về quy chế, quy định, tổ chức của bài thi năm 2025",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/188px-Flag_of_France.svg.png",
    tags: ["Quy chế", "Quy định", "ĐGNL"],
    link: "/about-exam"
  },
  {
    title: "Đề thi minh họa",
    description: "Một đề thi minh họa về môn Lịch sử",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/188px-Flag_of_France.svg.png",
    tags: ["Minh họa", "Đề thi", "Lịch sử"],
    link: "/exam/20"
  },
  {
    title: "Lịch thi ĐGNL",
    description: "Lịch thi mới nhất được cập nhật",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/188px-Flag_of_France.svg.png",
    tags: ["Lịch thi", "Mới nhất"],
    link: "/about-schedule"
  },
  {
    title: "Địa điểm tổ chức thi",
    description: "Các địa điểm tổ chức thi trên địa bàn Hà Nội và các tỉnh khác",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/188px-Flag_of_France.svg.png",
    tags: ["Địa điểm", "Hà Nội"],
    link: "/about-location"
  },
  {
    title: "Các trường đại học sử dụng kết quả ĐGNL",
    description: "Danh sách các trường đại học sử dụng kết quả ĐGNL cho mục đích tuyển sinh",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/188px-Flag_of_France.svg.png",
    tags: ["Đại học", "Tuyển sinh"],
    link: "/about-university"
  }
]);

const questionData = ref(null);

const fetchDailyQuestion = async () => {
  try {
    const response = await axios.get("http://localhost:8080/question/daily-question");
    const questionId = response.data;

    if (questionId) {
      const questionResponse = await axios.get(`http://localhost:8080/question/${questionId}`);
      questionData.value = questionResponse.data;
    }
  } catch (error) {
    console.error("Error fetching daily question:", error);
  }
};

onMounted(fetchDailyQuestion);

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
