<template>
    <div class="exam-content">
      <h1 class="title">Nội dung ôn tập phần Khoa học và Tiếng Anh</h1>
  
      <div class="section">
        <h2 class="section-title">Phần 3. Khoa học</h2>
        <p class="description">
          Thí sinh chọn <strong>3 trong số 5 chủ đề</strong>: Vật lí, Hóa học, Sinh học, Lịch sử, Địa lí. <br>
          Thời gian: 60 phút • Thang điểm: 50
        </p>
        <ul class="topics-list">
          <li v-for="(subject, index) in scienceSubjects" :key="'science-' + index" class="topic-item">
            {{ subject.name }}: {{ subject.details }}
          </li>
        </ul>
      </div>
  
      <div class="section">
        <h2 class="section-title">Phần 3. Tiếng Anh</h2>
        <p class="description">
          Tổng số câu hỏi: 50 (phục vụ các ngành đào tạo ngoại ngữ). <br>
          Thời gian: 60 phút • Thang điểm: 50
        </p>
        <ul class="topics-list">
          <li v-for="(subject, index) in englishSubjects" :key="'english-' + index" class="topic-item">
            {{ subject.name }}: {{ subject.details }}
          </li>
        </ul>
      </div>
  
    </div>
  </template>
  
  <script>
  export default {
    name: 'ExamContent',
    data() {
      return {
        scienceSubjects: [
          {
            name: 'Vật lí',
            details: 'Động học, động lực học, công, năng lượng, dao động, sóng, điện từ, vật lí nhiệt, thí nghiệm thực hành,...'
          },
          {
            name: 'Hóa học',
            details: 'Bảng tuần hoàn, liên kết hóa học, hóa học vô cơ, hữu cơ, polymer, phổ IR, phổ khối, thí nghiệm thực hành,...'
          },
          {
            name: 'Sinh học',
            details: 'Sinh học tế bào, vi sinh vật, sinh học cơ thể, di truyền, tiến hóa, sinh thái học, sinh học phân tử, thí nghiệm,...'
          },
          {
            name: 'Lịch sử',
            details: 'Lịch sử thế giới cận - hiện đại, Đông Nam Á, Việt Nam cận - hiện đại, hội nhập quốc tế,...'
          },
          {
            name: 'Địa lí',
            details: 'Địa lí đại cương, địa lí kinh tế xã hội thế giới, địa lí Việt Nam tự nhiên và kinh tế,...'
          }
        ],
        englishSubjects: [
          {
            name: 'Từ vựng, ngữ pháp, khả năng giao tiếp',
            details: 'Câu hỏi trắc nghiệm bốn lựa chọn, đánh giá khả năng sử dụng từ vựng và ngữ pháp trong giao tiếp, hành văn...'
          },
          {
            name: 'Đọc hiểu văn bản',
            details: 'Đánh giá khả năng đọc hiểu, xác định thông tin, ý chính, cấu trúc văn bản, quan điểm tác giả,...'
          },
          {
            name: 'Suy luận và giải quyết tình huống',
            details: 'Thông thạo và vận dụng ngôn ngữ tiếng Anh qua các câu hỏi suy luận và xử lý tình huống.'
          }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .exam-content {
    padding: 20px;
    max-width: 900px;
    margin: 40px auto;
    background: #fdfdfd;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  }
  
  .title {
    text-align: center;
    margin-bottom: 30px;
    color: #065206;
    font-size: 32px;
  }
  
  .section {
    margin-bottom: 40px;
  }
  
  .section-title {
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
  }
  
  .description {
    font-size: 16px;
    color: #666;
    margin-bottom: 20px;
  }
  
  .topics-list {
    list-style: none;
    padding: 0;
  }
  
  .topic-item {
    background: #e6f7ec;
    margin: 10px 0;
    padding: 14px 20px;
    border-radius: 8px;
    font-size: 18px;
    color: #333;
  }
  
  .topic-item:hover {
    background: #d0f0da;
  }
  </style>
  