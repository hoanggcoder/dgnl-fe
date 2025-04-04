<template>
  <div class="query-container">
    <div class="input-section">
      <label for="queryInput">Nhập câu hỏi:</label>
      <textarea id="queryInput" v-model="query" class="input-box"></textarea>
      
      <button @click="submitQuery" class="submit-btn">Gửi</button>

      <label for="outputArea">Câu trả lời:</label>
      <textarea id="outputArea" v-model="responseText" class="output-box" readonly></textarea>
    </div>

    <div class="options-container">
      <div class="options-box">
        <div class="option-group">
          <label class="option-title">Mức độ:</label>
          <label v-for="option in difficultyOptions" :key="option.value" class="option-box">
            <input type="radio" v-model="selectedDifficulty" :value="option.value" />
            {{ option.label }}
          </label>
        </div>

        <div class="option-group">
          <label class="option-title">Phương thức trả lời:</label>
          <label v-for="option in responseOptions" :key="option.value" class="option-box">
            <input type="radio" v-model="selectedResponseType" :value="option.value" />
            {{ option.label }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      responseText: "",
      selectedDifficulty: "",
      selectedResponseType: "", 
      difficultyOptions: [
        { label: "Dễ", value: "dễ" },
        { label: "Trung bình", value: "trung bình" },
        { label: "Khó", value: "khó" }
      ],
      responseOptions: [
        { label: "Đưa ra đáp án", value: "Đưa ra đáp án" },
        { label: "Trả lời chi tiết", value: "Trả lời chi tiết" },
        { label: "Sinh câu hỏi tương tự", value: "Sinh câu hỏi tương tự" }
      ]
    };
  },
  methods: {
    async submitQuery() {
      if (!this.query.trim()) {
        this.responseText = "Vui lòng nhập câu hỏi!";
        return;
      }

      try {
        console.log("Sending question:", this.query);
        const response = await fetch("http://localhost:8080/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: this.query }) 
        });

        const result = await response.json();
        this.responseText = result.answer;
      } catch (error) {
        this.responseText = "Lỗi khi gửi yêu cầu!";
        console.error("Error:", error);
      }
    }
  }
};
</script>

<style scoped>
.query-container {
  display: flex;
  max-width: 900px;
  margin: auto;
  gap: 20px;
  padding-top: 20px;
}

.input-section {
  flex: 2;
  display: flex;
  flex-direction: column;
}

.options-container {
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 20px;
}

.options-box {
  width: 100%;
  padding: 15px;
  border: 2px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
}

label {
  font-weight: bold;
  margin-top: 10px;
}

.input-box, .output-box {
  width: 100%;
  height: 150px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  resize: none;
}

.output-box {
  background-color: #f0f0f0;
}

.option-group {
  margin-bottom: 15px;
}

.option-title {
  font-weight: bold;
}

.option-box {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: 10px;
}

.submit-btn {
  padding: 12px;
  background-color: #066506;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  transition: 0.3s;
}

.submit-btn:hover {
  background-color: #054a04;
}

@media (max-width: 768px) {
  .query-container {
    flex-direction: column;
  }
  .options-container {
    justify-content: flex-start;
  }
}
</style>