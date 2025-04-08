<template>
    <div class="container">
      <h2>Thêm câu hỏi</h2>
      <form @submit.prevent="submitQuestion">
        <select v-model="question.type" required class="input-field">
          <option value="multiple_choices">Trắc nghiệm khách quan</option>
          <option value="fill_in">Điền đáp án</option>
        </select>
        <input v-model="question.topicId" type="number" placeholder="Chủ đề" required class="input-field" />
        <textarea v-model="question.detail" placeholder="Đề bài" required class="input-field"></textarea>
        <input v-model="question.choice1" v-if="question.type === 'multiple_choices'" placeholder="Phương án A" required class="input-field" />
        <input v-model="question.choice2" v-if="question.type === 'multiple_choices'" placeholder="Phương án B" required class="input-field" />
        <input v-model="question.choice3" v-if="question.type === 'multiple_choices'" placeholder="Phương án C" required class="input-field" />
        <input v-model="question.choice4" v-if="question.type === 'multiple_choices'" placeholder="Phương án D" required class="input-field" />
        <input v-model="question.answer" placeholder="Đáp án" required class="input-field" />
        <input v-model="question.picturePath" placeholder="Đường dẫn hình ảnh" class="input-field" />
        <button type="submit" class="btn">Thêm</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const question = ref({
    creatorId: localStorage.getItem("id"),
    type: 'multiple_choices',
    topicId: '',
    detail: '',
    choice1: '',
    choice2: '',
    choice3: '',
    choice4: '',
    answer: '',
    picturePath: ''
  });
  
  const submitQuestion = async () => {
  try {
    const token = localStorage.getItem("token");
    await axios.post('http://localhost:8080/question', question.value, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    alert('Question added successfully!');
    question.value = {
      creatorId: localStorage.getItem("id"),
      type: 'multiple_choices',
      topicId: '',
      detail: '',
      choice1: '',
      choice2: '',
      choice3: '',
      choice4: '',
      answer: '',
      picturePath: ''
    };
  } catch (error) {
    console.error('Error adding question:', error);
    alert('Failed to add question');
  }
};
</script>
  <style scoped>
  .container {
    max-width: 500px;
    margin: 20px auto;
    padding: 20px;
    padding-right: 40px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .input-field {
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .btn {
    background-color: #066506;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    margin-top: 10px;
  }
  .btn:hover {
    background-color: #066506;
  }
  </style>