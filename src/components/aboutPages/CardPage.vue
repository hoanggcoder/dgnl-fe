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
  height: 350px; 
  background: #f3f7f0;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 20px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
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
  padding: 14px;
  text-align: center;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}


.card-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #222;
  line-height: 1.3;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;       
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
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
  margin-top: auto;
}

.tag {
  background: #b9d0e7;
  color: #333;
  font-size: 13px;
  padding: 6px 10px;
  border-radius: 12px;
  font-weight: 500;
}
</style>
