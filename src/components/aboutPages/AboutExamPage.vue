<template>
    <div class="about-exam">
      <h2>Tổng Quan Chung Về Kỳ Thi Đánh Giá Năng Lực - HSA</h2>
      <p>
        Thí sinh đăng ký thi HSA nên tìm hiểu thông tin về kỳ thi và Đề án tuyển sinh của các cơ sở giáo dục trước khi đăng ký thi.
      </p>
      <h3>Bài Thi Đánh Giá Năng Lực (HSA)</h3>
      <p>
        Bài thi ĐGNL gồm 3 phần với các câu hỏi trắc nghiệm khách quan và câu hỏi điền đáp án về các lĩnh vực Toán học, Văn học/Ngôn ngữ, Khoa học hoặc tiếng Anh.
      </p>
      <table>
        <thead>
          <tr>
            <th>Lĩnh vực</th>
            <th>Câu hỏi</th>
            <th>Thời gian (phút)</th>
            <th>Điểm tối đa</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Toán học</td>
            <td>50</td>
            <td>75</td>
            <td>50</td>
          </tr>
          <tr>
            <td>Văn học - Ngôn ngữ</td>
            <td>50</td>
            <td>60</td>
            <td>50</td>
          </tr>
          <tr>
            <td>Khoa học hoặc Tiếng Anh</td>
            <td>50</td>
            <td>60</td>
            <td>50</td>
          </tr>
        </tbody>
      </table>
      <h3>Chuẩn Bị Cho Kỳ Thi</h3>
      <p>
        Bài thi ĐGNL đánh giá năng lực, kiến thức và kỹ năng của học sinh tích lũy trong quá trình học tập trung học phổ thông.
      </p>
      <h3>Đăng Ký Dự Thi</h3>
      <p>
        Bạn có thể đăng ký dự thi tại cổng thông tin khảo thí của Viện Đào tạo số và Khảo thí tại
        <a href="https://khaothi.vnu.edu.vn" target="_blank">https://khaothi.vnu.edu.vn</a> hoặc
        <a href="https://hsa.edu.vn" target="_blank">https://hsa.edu.vn</a>.
      </p>
      <h3>Phương Pháp Làm Bài Thi</h3>
      <p>
        Thí sinh cần kiểm soát tốt thời gian làm bài, đọc kỹ đề bài và hướng dẫn, phân chia thời gian hợp lý cho từng câu hỏi.
      </p>
      <h3>Điểm Bài Thi</h3>
      <p>
        Điểm bài thi được tính dựa trên tổng số câu trả lời đúng, không trừ điểm với câu trả lời sai.
      </p>
      <h3>Khai Thác Sử Dụng</h3>
      <p>
        Điểm bài thi ĐGNL của Đại học Quốc gia Hà Nội không giới hạn thời gian sử dụng, nhưng được khuyến nghị trong 24 tháng kể từ ngày thi.
      </p>
    </div>
  </template>
  
  <script>
  export default {
    name: "AboutExamPage",
  };
  </script>
  
  <style scoped>
  .about-exam {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    border: 1px solid #ddd;
  }
  
  h2, h3 {
    color: #333;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }
  
  table, th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  
  th {
    background-color: #066506;
    color: white;
  }
  
  a {
    color: #066506;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  </style>
  