<template>
  <div class="card">
    <div class="card-image-wrapper">
      <img v-if="thumbnail" :src="thumbnail" :alt="title" class="card-image" />
      <div class="overlay"></div>
    </div>

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
  width: 380px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 20px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.card-image-wrapper {
  position: relative;
}

.card-image {
  width: 100%;
  height: 230px;
  object-fit: cover;
  display: block;
}

.overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
}

.card-content {
  padding: 18px;
  text-align: center;
}

.card-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #222;
  transition: color 0.3s;
}

.card-title-link {
  text-decoration: none;
  color: inherit;
}

.card-title-link:hover .card-title {
  color: #066506;
}

.card-tags {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background: #eef2f6;
  color: #333;
  font-size: 13px;
  padding: 6px 10px;
  border-radius: 12px;
  font-weight: 500;
}
</style>
