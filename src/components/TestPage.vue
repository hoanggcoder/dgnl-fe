<template>
    <div>
      <h1>Online Test</h1>
      <TestQuestion v-for="question in questions" :key="question.id" :question="question" @answer-submitted="handleAnswer"/>
      <button @click="submitTest">Finish Test</button>
    </div>
</template>
  
<script>
  import TestQuestion from "@/components/TestQuestion.vue";
  
  export default {
    components: { TestQuestion },
    data() {
      return {
        questions: [
          {
            id: 1,
            title: "Câu hỏi 1",
            content: "Quá trình Haber điều chế ammonia được biểu diễn bằng phương trình: <br> N₂(g) + 3H₂(g) ⇌ 2NH₃(g)   ΔH⁰ = -92 kJ mol⁻¹ <br> Điều kiện nào sau đây sẽ làm tăng tốc độ phản ứng và tăng lượng ammonia tạo thành lúc cân bằng?",
            options: ["Tăng lượng xúc tác", "Tăng nhiệt độ phản ứng", "Tăng áp suất hệ phản ứng", "Giảm nhiệt độ phản ứng"]
          },
          {
            id: 2,
            title: "Câu hỏi 2",
            content: "1+1 = ?",
            options: ["0", "1", "2", "3"]
          }
        ],
        answers: {}
      };
    },
    methods: {
      handleAnswer({ id, answer }) {
        this.answers[id] = answer; 
      },
      submitTest() {
        const formattedAnswers = Object.entries(this.answers)
          .map(([id, answer]) => `Q${id}=${answer};`)
          .join("");

        console.log(formattedAnswers);
      }
    }
  };
</script>
  
<style>
  h1 {
    text-align: center;
  }
</style>