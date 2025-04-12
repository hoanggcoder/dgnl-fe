<template>
    <div class="exam-section">
      <h1 class="section-title">Phần 2: Ngôn ngữ - Văn học</h1>
  
      <div class="info-grid">
        <div class="info-item">
          <h2>⏰ Thời gian</h2>
          <p>60 phút</p>
        </div>
        <div class="info-item">
          <h2>🎯 Thang điểm</h2>
          <p>50 điểm</p>
        </div>
        <div class="info-item">
          <h2>📝 Câu hỏi</h2>
          <p>50 câu trắc nghiệm (25 đơn + 5 chùm 5 câu/ngữ cảnh)</p>
        </div>
      </div>
  
      <section class="content-block">
        <h2>📚 Nội dung</h2>
        <p>
          Ngữ liệu liên quan đến nhiều lĩnh vực: đời sống, văn học, ngôn ngữ (từ vựng, ngữ pháp, ngữ nghĩa, giao tiếp, phát triển ngôn ngữ, biến thể ngôn ngữ, hành văn), văn hóa, xã hội, lịch sử, địa lý, nghệ thuật, v.v.
        </p>
      </section>
  
      <section class="content-block">
        <h2>💡 Năng lực đánh giá</h2>
        <ul>
          <li>Giải quyết vấn đề, tự chủ - tự học, giao tiếp và hợp tác.</li>
          <li>Lập luận, tư duy logic, sử dụng ngôn ngữ tiếng Việt.</li>
          <li>Đọc hiểu văn bản khó, phân tích, đánh giá biểu đạt, sáng tạo ngôn ngữ.</li>
          <li>Phân tích và đánh giá văn bản có đề tài phức tạp.</li>
          <li>Nhận biết thể loại, hình tượng văn học; phân tích nội dung tư tưởng và cách thể hiện.</li>
          <li>Biểu đạt cảm xúc và ý tưởng về tác phẩm văn học.</li>
        </ul>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LanguageLiteratureSection',
  };
  </script>
  
  <style scoped>
  .exam-section {
    max-width: 900px;
    margin: 40px auto;
    padding: 30px;
    background: #fefefe;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
    font-family: 'Helvetica', sans-serif;
  }
  
  .section-title {
    text-align: center;
    color: #6a1b9a;
    font-size: 32px;
    margin-bottom: 30px;
  }
  
  .info-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 30px;
    justify-content: center;
  }
  
  .info-item {
    flex: 1 1 250px;
    background: #e8f0fe;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
  }
  
  .info-item h2 {
    color: #0d47a1;
    margin-bottom: 10px;
  }
  
  .info-item p {
    font-size: 18px;
    color: #333;
  }
  
  .content-block {
    margin-top: 20px;
  }
  
  .content-block h2 {
    color: #d32f2f;
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .content-block p, .content-block ul {
    font-size: 18px;
    color: #444;
  }
  
  .content-block ul {
    padding-left: 20px;
  }
  
  .content-block li {
    margin-bottom: 8px;
  }
  </style>
  