<template>
  <div class="query-container">
    <label for="queryInput">Nhập câu hỏi:</label>
    <textarea id="queryInput" v-model="query" class="input-box"></textarea>

    <div class="options-container">
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

    <button @click="submitQuery" class="submit-btn">Gửi</button>

    <label for="outputArea">Câu trả lời:</label>
    <textarea id="outputArea" v-model="responseText" class="output-box" readonly></textarea>
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
  computed: {
    formattedQuestion() {
      let optionsString = "";
      if (this.selectedDifficulty) optionsString += ` [Mức độ: ${this.selectedDifficulty}]`;
      if (this.selectedResponseType) optionsString += ` [Thực hiện yêu cầu: ${this.selectedResponseType}]`;

      return "Với câu hỏi cho trước sau " +this.query.trim() + optionsString + "Nếu đây không phải một đề bài, trả lời hãy đưa ra một câu hỏi hợp lệ.";
    }
  },
  methods: {
    async submitQuery() {
      if (!this.query.trim()) {
        this.responseText = "Vui lòng nhập câu hỏi!";
        return;
      }

      try {
        console.log("Sending question:", this.formattedQuestion);
        const response = await fetch("http://localhost:8080/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: this.formattedQuestion }) 
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
  max-width: 700px;
  margin: auto;
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;
}

label {
  font-weight: bold;
  margin-top: 10px;
}

.input-box {
  width: 100%;
  height: 120px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  margin-top: 5px;
}

.output-box {
  width: 100%;
  height: 120px;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  margin-top: 5px;
  resize: none;
}

.options-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px 0;
}

.option-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.option-title {
  font-weight: bold;
  width: 100%;
}

.option-box {
  display: flex;
  align-items: center;
  gap: 5px;
}

.submit-btn {
  padding: 10px;
  background-color: #066506;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

.submit-btn:hover {
  background-color: #054a04;
}
</style>