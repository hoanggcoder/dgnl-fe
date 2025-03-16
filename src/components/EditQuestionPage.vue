<template>
    <div class="container">
      <h2>Edit Question</h2>
      <form @submit.prevent="updateQuestion">
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
        <button type="submit" class="btn">Update</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import axios from 'axios';
  
  const route = useRoute();
  const router = useRouter();
  const question = ref({});
  
  const fetchQuestion = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8080/questions/${route.params.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      question.value = response.data;
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };
  
  const updateQuestion = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:8080/questions/${route.params.id}`, question.value, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Question updated successfully!');
      router.push('/manage');
    } catch (error) {
      console.error("Error updating question:", error);
      alert("Failed to update question");
    }
  };
  
  onMounted(fetchQuestion);
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
    background-color: #007bff;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    margin-top: 10px;
  }
  .btn:hover {
    background-color: #0056b3;
  }
  </style>
  