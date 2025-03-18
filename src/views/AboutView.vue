<template>
  <div class="container">
    <div class="about-box">
      <h1>Giới thiệu về Website</h1>
      <p>
        Đây là một website hỗ trợ việc ôn luyện và thi kỳ thi 
        <strong>Đánh giá năng lực</strong> của 
        <strong>Đại học Quốc gia Hà Nội</strong>, diễn ra hàng năm.
      </p>
      <p>
        Website hoạt động độc lập và không có liên hệ với bất kỳ cơ quan đoàn thể nào.
      </p>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f4f4;
  padding: 20px;
}

.about-box {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  text-align: center;
}

h1 {
  color: #333;
  font-size: 28px;
  margin-bottom: 15px;
}

p {
  color: #555;
  font-size: 18px;
  line-height: 1.6;
}
</style>
