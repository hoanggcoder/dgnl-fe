<template>
  <div class="exam-content">
    <h1 class="title">Nội dung ôn tập phần Toán học và xử lý số liệu</h1>
    <ul class="topics-list">
      <li v-for="(topic, index) in topics" :key="index" class="topic-item" @click="selectTopic(topic)">
        {{ topic.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'; 

export default {
  name: 'ExamContent',
  data() {
    return {
      topics: [] 
    };
  },
  methods: {
    async fetchTopics() {
      try {
        const response = await axios.get('http://localhost:8080/topic/oid/31');
        this.topics = response.data; 
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    },
    selectTopic(topic) {
      window.location.href = "/article/" + topic.id;
    }
  },
  mounted() {
    this.fetchTopics(); 
  }
};
</script>

<style scoped>
.exam-content {
  padding: 20px;
  max-width: 700px;
  margin: 40px auto;
  background: #fdfdfd;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}

.title {
  text-align: center;
  margin-bottom: 20px;
  color: #066506;
  font-size: 28px;
}

.topics-list {
  list-style: none;
  padding: 0;
}

.topic-item {
  background: #e0f7e9;
  margin: 10px 0;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 18px;
  color: #333;
  cursor: pointer;
}

.topic-item:hover {
  background: #c8f0db;
}
</style>
