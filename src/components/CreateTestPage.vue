<template>
  <div class="create-exam">
    <h2>Thêm Kỳ Thi</h2>
    <form @submit.prevent="submitExam">
      <div class="form-group">
        <label for="name">Tên Kỳ Thi</label>
        <input type="text" id="name" v-model="exam.name" required />
      </div>
      
      <div class="form-group">
        <label for="type">Loại</label>
        <input type="text" id="type" v-model="exam.type" required />
      </div>

      <div class="form-group">
        <label for="description">Mô tả</label>
        <input type="text" id="description" v-model="exam.description" required />
      </div>
      
      <div class="form-group">
        <label for="difficulty">Độ Khó</label>
        <select id="difficulty" v-model="exam.difficulty" required>
          <option value="easy">Dễ</option>
          <option value="medium">Trung Bình</option>
          <option value="hard">Khó</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="startTime">Thời Gian Bắt Đầu</label>
        <input type="time" id="startTime" v-model="exam.startTime" required />
      </div>
      
      <div class="form-group">
        <label for="endTime">Thời Gian Kết Thúc</label>
        <input type="time" id="endTime" v-model="exam.endTime" required />
      </div>
      
      <h3>Thông Tin Bài Kiểm Tra</h3>
      <div class="form-group">
        <label for="timeLimit">Thời Gian Giới Hạn (phút)</label>
        <input type="number" id="timeLimit" v-model="testInput.timeLimit" required />
      </div>
      
      <div class="form-group">
        <label for="scoreToPass">Điểm Đạt</label>
        <input type="number" id="scoreToPass" v-model="testInput.scoreToPass" step="0.1" required />
      </div>
      
      <div class="form-group">
        <label for="numberOfQuestions">Số Câu Hỏi</label>
        <input type="number" id="numberOfQuestions" v-model="testInput.numberOfQuestions" required />
      </div>
      
      <h3>Chọn Câu Hỏi</h3>
      <div class="filters">
        <input v-model="searchQuery" placeholder="Tìm kiếm câu hỏi" class="search-input" />
        <select v-model="selectedType" class="filter-select">
          <option value="">Tất cả loại</option>
          <option value="multiple_choices">Trắc nghiệm</option>
          <option value="fill_in">Điền vào chỗ trống</option>
        </select>
      </div>
      
      <div v-for="question in paginatedQuestions" :key="question.id" class="question-item">
        <input type="checkbox" :value="question.id" v-model="testInput.questionsList" />
        <div class="question-content">
          <h3>{{ question.detail }}</h3>
          <p><strong>Đáp án:</strong> {{ question.answer }}</p>
        </div>
      </div>
      
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Trang trước</button>
        <span>Trang {{ currentPage }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Trang sau</button>
      </div>
      
      <button type="submit">Thêm Kỳ Thi và Bài Kiểm Tra</button>
    </form>
    
    <p v-if="message" class="success-message">{{ message }}</p>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script>
import axios from "axios";
import { reactive, ref, computed, onMounted } from "vue";

export default {
  setup() {
    const exam = reactive({
      creatorId: localStorage.getItem("id"),
      name: "",
      type: "",
      description: "",
      difficulty: "easy",
      startTime: "",
      endTime: "",
    });
    
    const testInput = reactive({
      timeLimit: null,
      scoreToPass: null,
      numberOfQuestions: null,
      questionsList: []
    });

    const createInput = reactive({
      testId: null,
      examId: null,
    });
    
    const questions = ref([]);
    const searchQuery = ref("");
    const selectedType = ref("");
    const currentPage = ref(1);
    const itemsPerPage = 10;
    
    const filteredQuestions = computed(() => {
      return questions.value.filter(q => {
        return (
          q.detail.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
          (selectedType.value ? q.type === selectedType.value : true)
        );
      });
    });
    
    const totalPages = computed(() => Math.ceil(filteredQuestions.value.length / itemsPerPage));
    
    const paginatedQuestions = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      return filteredQuestions.value.slice(start, start + itemsPerPage);
    });
    
    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };
    
    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };
    
    const message = ref("");
    const error = ref("");

    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:8080/questions");
        questions.value = response.data;
      } catch (err) {
        console.error("Lỗi khi lấy danh sách câu hỏi", err);
      }
    };
    
    const submitExam = async () => {
      try {
        const token = localStorage.getItem("token");
        const examResponse = await axios.post("http://localhost:8080/exam", exam, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        
        const examId = examResponse.data.id;
        const formattedQuestionsList = testInput.questionsList
        .map((questionId, index) => `Q${index + 1}=${questionId}`)
        .join(";") + ";";
        testInput.questionsList = formattedQuestionsList;
        
        const response = await axios.post("http://localhost:8080/test/create", testInput, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const testId = response.data;
        createInput.testId = testId;
        createInput.examId = examId;
        await axios.post("http://localhost:8080/exam/create", createInput, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        
        message.value = "Kỳ thi và bài kiểm tra đã được thêm thành công!";
        error.value = "";
      } catch (err) {
        error.value = "Lỗi khi thêm kỳ thi hoặc bài kiểm tra. Kiểm tra dữ liệu nhập vào.";
        message.value = "";
      }
    };
    
    onMounted(fetchQuestions);

    return { exam, testInput, searchQuery, selectedType, paginatedQuestions, currentPage, totalPages, prevPage, nextPage, message, error, submitExam };
  },
};
</script>

<style scoped>
.create-exam {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
}

h2, h3 {
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
}

input,
select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #066506;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #054b04;
}
</style>