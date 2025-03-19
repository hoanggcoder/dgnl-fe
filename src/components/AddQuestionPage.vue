<template>
    <div class="container">
      <h2>Add New Question</h2>
      <form @submit.prevent="submitQuestion">
        <select v-model="question.type" required class="input-field">
          <option value="multiple_choices">Multiple Choices</option>
          <option value="fill_in">Fill in</option>
        </select>
        <input v-model="question.topicId" type="number" placeholder="Topic ID" required class="input-field" />
        <input v-model="question.articleId" type="number" placeholder="Article ID" class="input-field" />
        <textarea v-model="question.detail" placeholder="Detail" required class="input-field"></textarea>
        <input v-model="question.choice1" placeholder="Choice 1" required class="input-field" />
        <input v-model="question.choice2" placeholder="Choice 2" required class="input-field" />
        <input v-model="question.choice3" placeholder="Choice 3" required class="input-field" />
        <input v-model="question.choice4" placeholder="Choice 4" required class="input-field" />
        <input v-model="question.answer" placeholder="Answer" required class="input-field" />
        <input v-model="question.picturePath" placeholder="Picture Path" class="input-field" />
        <button type="submit" class="btn">Submit</button>
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
    articleId: '',
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
    await axios.post('http://localhost:8080/questions', question.value, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    alert('Question added successfully!');
    question.value = {
      creatorId: localStorage.getItem("id"),
      type: 'multiple_choices',
      topicId: '',
      articleId: '',   
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
    background-color: #4CAF50;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    margin-top: 10px;
  }
  .btn:hover {
    background-color: #45a049;
  }
  </style>