<template>
  <div class="page-container">
    <div class="content-wrapper">
      <div class="main-content">

        <div class="slider-container">
          <button class="back-button" @click="prevSlide">&#10094;</button>
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
          <button class="forward-button" @click="nextSlide">&#10095;</button>
        </div>
        <QuoteDisplay />
      </div>

      <div class="time-progress">
        <TimeProgress />
      </div>

      <div class="subjects-list">
        <h1 class="subject-title">Kiến thức theo từng phần</h1>
        <ul>
          <li v-for="subject in subjects" :key="subject" @click="selectSubject(subject)">
            {{ subject }}
          </li>
        </ul>
        <h1 class="location">Địa điểm thi ĐGNL</h1>
        <div class="image-viewer">
          <img
            src="@\assets\map.png"
            alt="Thumbnail"
            class="thumbnail-image"
            @click="showFullImage = true"
          />
          <p class="image-caption">Địa điểm tổ chức thi. Bấm vào hình để xem sơ đồ ĐHQGHN cơ sở 144 Xuân Thủy</p>
        </div>
      </div>
    </div>

    <div class="extras-section">
      <div class="daily-question">
        <DailyQuestionPage v-if="questionData" :question="questionData" />
      </div>

      <div class="games-wrapper">
        <WordleGame />
        <HangmanGame />
      </div>
    </div>

    <ChatBot />

    <div v-if="showFullImage" class="modal" @click="showFullImage = false">
      <img src="@\assets\map_full.jpg" alt="Full Image" class="full-image" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

import aboutExamImage from '@/assets/hsa2.png';

import CardPage from '@/components/aboutPages/CardPage.vue';
import DailyQuestionPage from '@/components/minigames/DailyQuestionPage.vue';
import ChatBot from '@/components/misc/ChatBot.vue';
import QuoteDisplay from '@/components/misc/QuoteDisplay.vue';
import TimeProgress from '@/components/misc/TimeProgress.vue';
import WordleGame from '@/components/minigames/WordleGame.vue';
import HangmanGame from '@/components/minigames/HangmanGame.vue';


const cards = ref([
  {
    title: "Giới thiệu về kỳ thi ĐGNL",
    thumbnail: aboutExamImage,
    tags: ["Quy chế", "Quy định", "ĐGNL"],
    link: "/about-exam"
  },
  {
    title: "Đề thi minh họa",
    thumbnail: aboutExamImage,
    tags: ["Minh họa", "Đề thi", "Lịch sử"],
    link: "/exam/20"
  },
  {
    title: "Lịch thi ĐGNL",
    thumbnail: aboutExamImage,
    tags: ["Lịch thi", "Mới nhất"],
    link: "/about-schedule"
  },
  {
    title: "Địa điểm tổ chức thi",
    thumbnail: aboutExamImage,
    tags: ["Địa điểm", "Hà Nội"],
    link: "/about-location"
  },
  {
    title: "Các trường đại học sử dụng kết quả ĐGNL cho mục đích tuyển sinh",
    thumbnail: aboutExamImage,
    tags: ["Đại học", "Tuyển sinh"],
    link: "/about-university"
  }
]);

const questionData = ref(null);

const subjects = ["Toán học và xử lý số liệu", "Ngôn ngữ - Văn học", "Khoa học"];

const selectSubject = (subject) => {
  console.log("Selected subject:", subject);
};

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

const showFullImage = ref(false);

</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 99%;
  box-sizing: border-box;
}

.content-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.slider-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
}

.card-container {
  display: flex;
  gap: 10px;
  justify-content: center;
  width: 100%;
  max-width: 100%;
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

.back-button:hover {
  transition: background-color 0.3s;
  color: #066506;
}
.forward-button:hover {
  transition: background-color 0.3s;
  color: #066506;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.time-progress {
  position: absolute;
  top: 181%;
  right: 20px;
  transform: translateY(-50%);
  width: 30%;
}

.daily-question,
.chat-bot {
  width: 100%;
  text-align: center;
}

@media (max-width: 768px) {
  .main-content {
    width: 100%;
  }

  .time-progress {
    width: 100%; 
    position: relative;
    transform: none;
  }

  .card {
    max-width: 300px;
    min-width: 200px;
  }
}

.subjects-list {
  position: absolute;
  top: 146%;
  left: 5px;
  transform: translateY(-50%);
  width: 30%;
  background-color: #f3f7f0;
  padding: 10px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.subjects-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.subjects-list li {
  padding: 8px 12px;
  margin-bottom: 6px;
  background-color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  text-align: center;
  font-weight: 500;
}

.subjects-list li:hover {
  background-color: #066506;
  color: white;
}

.subject-title, .location {
  font-size: 20px;
  font-weight: bold;
  color: #066506;
  margin-bottom: 15px;
  text-align: center;
}

.location {
  margin-top: 40px;
}

.image-viewer {
  margin-top: 10px;
  margin-bottom: 50px;
  text-align: center;
}

.thumbnail-image {
  width: 250px;
  height: auto;
  cursor: pointer;
  border-radius: 8px;
  transition: transform 0.3s;
}

.thumbnail-image:hover {
  transform: scale(1.05);
}

.image-caption {
  margin-top: 8px;
  font-size: 14px;
  color: #666;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.full-image {
  max-width: 90%;
  max-height: 90%;
  border-radius: 12px;
}
</style>
