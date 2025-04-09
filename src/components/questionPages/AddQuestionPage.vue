<template>
  <div class="container">
    <h2>Thêm câu hỏi</h2>
    <form @submit.prevent="submitQuestion">
      <div class="field">
        <label>Loại câu hỏi</label>
        <div class="button-group">
          <button
            type="button"
            :class="{ 'active': question.type === 'multiple_choices' }"
            @click="question.type = 'multiple_choices'"
            class="toggle-btn"
          >
            Trắc nghiệm khách quan
          </button>
          <button
            type="button"
            :class="{ 'active': question.type === 'fill_in' }"
            @click="question.type = 'fill_in'"
            class="toggle-btn"
          >
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
        <textarea v-model="question.detail" placeholder="Nhập đề bài..." required class="input-field" @input="renderPreview"></textarea>

        <div ref="previewContainer" class="preview" v-html="question.detail"></div>
      </div>

      <template v-if="question.type === 'multiple_choices'">
        <div class="field" v-for="n in 4" :key="n">
          <label>Phương án {{ String.fromCharCode(64 + n) }}</label>
          <input v-model="question['choice' + n]" :placeholder="'Phương án ' + String.fromCharCode(64 + n)" required class="input-field" />
        </div>
      </template>

      <div class="field">
        <label>Đáp án</label>
        <input v-model="question.answer" placeholder="Đáp án" required class="input-field" />
      </div>

      <div class="field">
        <label>Đường dẫn hình ảnh</label>
        <input v-model="question.picturePath" placeholder="Đường dẫn hình ảnh" class="input-field" />
      </div>

      <button type="submit" class="btn">Thêm câu hỏi</button>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue';
import axios from 'axios';
import 'katex/dist/katex.min.css'
import renderMathInElement from 'katex/contrib/auto-render';

const question = ref({
  creatorId: localStorage.getItem("id"),
  type: 'multiple_choices',
  topicId: '',
  detail: '',
  choice1: '',
  choice2: '',
  choice3: '',
  choice4: '',
  answer: '',
  picturePath: ''
});

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

const submitQuestion = async () => {
  try {
    const token = localStorage.getItem("token");
    await axios.post('http://localhost:8080/question', question.value, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    alert('Thêm câu hỏi thành công!');
    question.value = {
      creatorId: localStorage.getItem("id"),
      type: 'multiple_choices',
      topicId: '',
      detail: '',
      choice1: '',
      choice2: '',
      choice3: '',
      choice4: '',
      answer: '',
      picturePath: ''
    };
    renderPreview();
  } catch (error) {
    console.error('Error adding question:', error);
    alert('Thêm thất bại');
  }
};
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

.preview {
  width: 100%;
  background: #f9f9f9;
  border: 1px dashed #ccc;
  padding: 10px;
  margin-top: 10px;
  min-height: 50px;
  border-radius: 6px;
  font-size: 18px;
  color: #333;
}
</style>
