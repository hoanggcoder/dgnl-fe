<template>
  <div class="query-container">
    <div class="input-section">
      <label for="queryInput" class="section-title"> Câu hỏi:</label>
      <div class="box-container">
        <textarea 
          id="queryInput" 
          v-model="query" 
          class="input-box" 
          placeholder="Nhập câu hỏi của bạn tại đây..."
        ></textarea>
      </div>

      <button @click="submitQuery" class="submit-btn" :disabled="loading">
        {{ loading ? "Đang gửi..." : "Gửi" }}
      </button>

      <label for="outputArea" class="section-title"> Câu trả lời:</label>
      <div class="box-container output-container">
        <textarea 
          id="outputArea" 
          v-model="responseText" 
          class="output-box" 
          readonly
          placeholder="Câu trả lời sẽ hiển thị ở đây..."
        ></textarea>
      </div>
    </div>

    <div class="options-container">
  <div class="options-box">
    <div class="option-group">
      <label class="option-title">Mức độ:</label>
      <div class="option-list">
        <div 
          v-for="option in difficultyOptions" 
          :key="option.value" 
          class="option-item" 
          :class="{ selected: selectedDifficulty === option.value }"
          @click="selectedDifficulty = option.value"
        >
          {{ option.label }}
        </div>
      </div>
    </div>

    <div class="option-group">
            <label class="option-title">Phương thức trả lời:</label>
            <div class="option-list">
              <div 
                v-for="option in responseOptions" 
                :key="option.value" 
                class="option-item" 
                :class="{ selected: selectedResponseType === option.value }"
                @click="selectedResponseType = option.value"
              >
                {{ option.label }}
              </div>
            </div>
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
      loading: false,
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

      this.loading = true;
      this.responseText = "⏳ Đang xử lý, vui lòng chờ...";

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
        this.responseText = "❌ Lỗi khi gửi yêu cầu!";
        console.error("Error:", error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.query-container {
  display: flex;
  max-width: 1100px;
  margin: 40px auto;
  gap: 20px;
  padding: 20px;
}

.input-section {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.options-container {
  flex: 1;
  display: flex;
  justify-content: center;
}

.options-box {
  width: 100%;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 12px;
  background: linear-gradient(to bottom right, #f9f9f9, #f0f0f0);
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}

.box-container {
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  transition: box-shadow 0.3s ease;
}

.box-container:hover {
  box-shadow: 0 0 8px rgba(0,0,0,0.1);
}

.input-box, .output-box {
  width: 100%;
  height: 180px;
  border: none;
  outline: none;
  font-size: 16px;
  resize: none;
  background: transparent;
}

.output-container {
  background-color: #f0f8ff;
}

.option-group {
  margin-bottom: 20px;
}

.option-title {
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
}

.option-box {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 12px;
  margin-top: 8px;
}

.submit-btn {
  padding: 14px;
  background-color: #066506;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s, transform 0.2s;
}

.submit-btn:hover {
  background-color: #054a04;
  transform: scale(1.02);
}

.submit-btn:disabled {
  background-color: #999;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .query-container {
    flex-direction: column;
  }
  .options-container {
    justify-content: flex-start;
  }
}

.option-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 8px;
}

.option-item {
  padding: 10px 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #f9f9f9;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;
  user-select: none;
}

.option-item:hover {
  background: #67c58b;
  border-color: #066506;
}

.option-item.selected {
  background: #066506;
  color: white;
  border-color: #066506;
}
</style>
