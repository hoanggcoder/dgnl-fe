<template>
  <div class="container">
    <h2>Chỉnh sửa câu hỏi</h2>
    <form @submit.prevent="updateQuestion">
      <div class="field">
        <label>Loại câu hỏi</label>
        <div class="button-group">
          <button type="button" :class="{ 'active': question.type === 'multiple_choices' }" @click="setType('multiple_choices')" class="toggle-btn">
            Trắc nghiệm khách quan
          </button>
          <button type="button" :class="{ 'active': question.type === 'fill_in' }" @click="setType('fill_in')" class="toggle-btn">
            Điền đáp án
          </button>
        </div>
      </div>

      <div class="field">
        <label>Chủ đề (ID)</label>
        <input v-model="question.topicId" type="number" placeholder="Chủ đề" required class="input-field" />
      </div>

      <div class="field">
        <label>Đề bài</label>
        <textarea v-model="question.detail" placeholder="Nhập đề bài..." required class="input-field"></textarea>
        <div ref="previewContainer" class="preview" v-html="question.detail"></div>
      </div>

      <template v-if="question.type === 'multiple_choices'">
        <div v-for="(choice, index) in choiceFields" :key="index" class="field">
          <label>Phương án {{ choice.label }}</label>
          <input v-model="question[choice.model]" :placeholder="`Phương án ${choice.label}`" required class="input-field" />
        </div>
      </template>

      <div class="field">
        <label>Đáp án</label>
        <input v-model="question.answer" placeholder="Nhập đáp án chính xác..." required class="input-field" />
      </div>

      <div class="field">
        <label>Đường dẫn hình ảnh</label>
        <input v-model="question.picturePath" placeholder="Đường dẫn hình ảnh (nếu có)" class="input-field" />
      </div>

      <button type="submit" class="btn">Cập nhật câu hỏi</button>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import 'katex/dist/katex.min.css';
import renderMathInElement from 'katex/contrib/auto-render';

const route = useRoute();
const router = useRouter();
const question = ref({});

const choiceFields = [
  { label: 'A', model: 'choice1' },
  { label: 'B', model: 'choice2' },
  { label: 'C', model: 'choice3' },
  { label: 'D', model: 'choice4' },
];

const fetchQuestion = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`http://localhost:8080/question/${route.params.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    question.value = response.data;
  } catch (error) {
    console.error("Error fetching question:", error);
    alert("Không thể lấy thông tin câu hỏi");
  }
};

const updateQuestion = async () => {
  try {
    const token = localStorage.getItem("token");
    await axios.put(`http://localhost:8080/question/${route.params.id}`, question.value, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert('Cập nhật câu hỏi thành công!');
    router.push('/manage');
  } catch (error) {
    console.error("Error updating question:", error);
    alert("Cập nhật thất bại");
  }
};

const setType = (type) => {
  question.value.type = type;
};


const previewContainer = ref(null);

const renderPreview = () => {
  nextTick(() => {
    if (previewContainer.value) {
      renderMathInElement(previewContainer.value, {
        delimiters: [
          {left: "\\(", right: "\\)", display: false},
          {left: "\\[", right: "\\]", display: true},
          {left: "$", right: "$", display: false}
        ],
        throwOnError: false,
      });
    }
  });
};

watch(() => question.value.detail, () => {
  renderPreview();
});

onMounted(() => {
  renderPreview();
});

onMounted(fetchQuestion);
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 30px auto;
  padding: 25px 30px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #066506;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
}

.field {
  width: 100%;
  margin-bottom: 15px;
}

.field label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #333;
}

.input-field {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 15px;
  background: #f9f9f9;
  transition: 0.3s;
}

.input-field:focus {
  border-color: #066506;
  outline: none;
  background: #fff;
}

textarea.input-field {
  min-height: 100px;
  resize: vertical;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 8px;
}

.toggle-btn {
  flex: 1;
  min-width: 140px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s, border-color 0.3s, color 0.3s;
}

.toggle-btn.active {
  background-color: #066506;
  color: white;
  border-color: #066506;
}

.toggle-btn:hover {
  background-color: #045104;
  color: white;
}

.btn {
  background-color: #066506;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;
  font-weight: bold;
  letter-spacing: 0.5px;
  margin-top: 20px;
}

.btn:hover {
  background-color: #045104;
}

.latex-preview {
  background: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
  margin-top: 5px;
  font-size: 1.2em;
  min-height: 50px;
}
.preview span {
  font-weight: bold;
  color: #666;
}
</style>
