<template>
    <div class="subjects-list">
      <h1 class="subject-title">Tổng hợp lý thuyết</h1>
      <ul class="subject-ul">
        <li 
          v-for="subject in subjects" 
          :key="subject" 
          @click="selectSubject(subject)"
          class="subject-item"
        >
          {{ subject }}
        </li>
      </ul>
    </div>
  </template>

<script setup>
import { ref } from 'vue';

const subjects = ref([
  'Toán học và xử lý số liệu',
  'Ngôn ngữ - Văn học',
  'Khoa học'
]);

const subjectLinks = {
  'Toán học và xử lý số liệu': '/about-part-1',
  'Ngôn ngữ - Văn học': '/about-part-2',
  'Khoa học': '/about-part-3'
};

const selectSubject = (subject) => {
  const link = subjectLinks[subject];
  if (link) {
    window.location.href = link;
  }
};
</script>

<style scoped>
.subjects-list {
  max-width: 600px;
  margin: 40px auto;
  background: #f3f7f0;
  padding: 30px 40px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.subject-title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #066506;
}

.subject-ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.subject-item {
  font-size: 20px;
  padding: 15px 20px;
  margin-bottom: 15px;
  background-color: white;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
}

.subject-item:hover {
  background-color: #066506;
  color: #ffffff;
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}
</style>
