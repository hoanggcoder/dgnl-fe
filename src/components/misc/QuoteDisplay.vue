<template>
  <div class="banner-container">
    <div class="banner-content">
      <p class="banner-quote">"{{ quote.text }}"</p>
      <p class="banner-author">- {{ quote.author || "Unknown" }}</p>
      <button @click="fetchQuote" class="refresh-btn">
        <i class="fas fa-sync-alt"></i>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      quote: {
        text: "The journey of a thousand miles begins with one step.",
        author: "Lao Tzu"
      }
    };
  },
  methods: {
    async fetchQuote() {
      try {
        const response = await axios.get("https://api.quotable.io/random");
        this.quote = { text: response.data.content, author: response.data.author };
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
    }
  },
  mounted() {
    this.fetchQuote();
  }
};
</script>

<style scoped>
.banner-container {
  width: 103%;
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #7b7c7b, #fa0404);
  color: rgb(200, 222, 34);
  text-align: center;
}

.banner-content {
  max-width: 90%;
  padding: 20px;
  position: relative;
}

.banner-quote {
  font-size: 24px;
  font-style: italic;
  font-weight: bold;
  margin-bottom: 10px;
}

.banner-author {
  font-size: 20px;
  margin-bottom: 20px;
}

.refresh-btn {
  position: absolute;
  top: 10px;
  right: -10px;
  background: none;
  border: none;
  font-size: 20px;
  color: white;
  cursor: pointer;
  transition: 0.3s;
}

.refresh-btn:hover {
  color: #e0e0e0;
}
</style>
