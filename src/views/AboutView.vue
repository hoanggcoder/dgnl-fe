<template>
  <div class="container">
    <div class="about-box">
      <div class="about-text">
        <h1>Giới thiệu về Website</h1>
        <div class="paragraphs">
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
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: 20px;
}

.about-box {
  background: #f3f7f0;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 1000px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 30px;
}

.about-text {
  display: flex;
  flex-direction: column;
  text-align: left;
}

h1 {
  color: #333;
  font-size: 32px;
  margin-bottom: 20px;
}

.paragraphs p {
  color: #555;
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 10px;
}
</style>
