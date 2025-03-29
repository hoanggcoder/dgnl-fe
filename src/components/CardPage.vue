<template>
  <div class="card">
    <img v-if="thumbnail" :src="thumbnail" :alt="title" class="card-image" />

    <div class="card-content">
      <router-link :to="link" class="card-title-link">
        <h2 class="card-title">{{ title }}</h2>
      </router-link>

      <div class="card-tags">
        <span v-for="(tag, index) in tags" :key="index" class="tag">{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  title: String,
  thumbnail: String,
  tags: Array,
  link: String
});
</script>

<style scoped>
.card {
  width: 400px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  margin: 20px;
  transition: transform 0.2s ease-in-out;
}

.card:hover {
  transform: scale(1.05);
}

.card-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.card-content {
  padding: 20px;
}

.card-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
  text-align: center;
}

.card-title-link {
  text-decoration: none;
  color: inherit;
}


.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag {
  background: #ddd;
  color: #444;
  font-size: 14px;
  padding: 6px 12px;
  border-radius: 15px;
}
</style>