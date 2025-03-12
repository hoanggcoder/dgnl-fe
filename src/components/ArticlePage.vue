<template>
    <div class="article-container">
      <div class="article-content">
        <h1>{{ article.title }}</h1>
        <p v-for="(paragraph, index) in article.content" :key="index">
          {{ paragraph }}
        </p>
        <img :src="article.image" alt="Article Image" class="article-image" />
      </div>
  
      <div class="sidebar">
        <h2>Related News</h2>
        <ul>
          <li v-for="news in relatedNews" :key="news.id" class="news-item">
            <img :src="news.image" alt="News Image" class="news-image" />
            <a href="#" class="news-title">{{ news.title }}</a>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        article: {
          title: "Phải thay đổi tư duy, nhận thức mới thay đổi được ứng xử và hành động",
          content: [
            "Tổng Bí thư ghi nhận kinh tế tư nhân nước ta đã có những bước phát triển và trưởng thành vượt bậc...",
            "Tuy nhiên, Tổng Bí thư cũng chỉ ra một số hạn chế, yếu kém của khu vực kinh tế tư nhân...",
            "Ngoài các doanh nghiệp tư nhân, lực lượng hơn 5 triệu hộ kinh doanh cá thể rất lớn..."
          ],
          image: "https://cdnphoto.dantri.com.vn/6NsXPH1-xI7gL3FqZt-BksNmv0I=/thumb_w/1360/2025/03/07/vnapotaltongbithutolamlamviecvoibanchinhsachchienluoctrunguong7900486-1741353646091.jpg" // Replace with real image URL
        },
        relatedNews: [
          { id: 1, title: "Thông nhất bỏ cấp huyện, nếu tiêu chí sáp nhập các tỉnh", image: "https://via.placeholder.com/100" },
          { id: 2, title: '"Tinh gọn bộ máy, chuẩn bị sắp xếp địa giới hành chính"', image: "https://via.placeholder.com/100" },
          { id: 3, title: "Thủ tướng yêu cầu kiểm điểm trách nhiệm chậm sân bay Long Thành", image: "https://via.placeholder.com/100" },
          { id: 4, title: "Tổng Bí thư Tô Lâm sắp thăm Indonesia và Singapore", image: "https://via.placeholder.com/100" }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .article-container {
    display: flex;
    max-width: 1200px;
    margin: auto;
    gap: 20px;
    padding: 20px;
  }
  
  .article-content {
    flex: 2;
    background: white;
  }
  
  .article-content h1 {
    font-size: 24px;
    font-weight: bold;
  }
  
  .article-content p {
    font-size: 18px;
    line-height: 1.6;
  }
  
  .article-image {
    width: 100%;
    margin-top: 10px;
    border-radius: 5px;
  }
  
  .sidebar {
    flex: 1;
    background: white;
    padding: 10px;
  }
  
  .sidebar h2 {
    font-size: 20px;
    font-weight: bold;
  }
  
  .news-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .news-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    margin-right: 10px;
  }
  
  .news-title {
    text-decoration: none;
    color: black;
    font-size: 16px;
    font-weight: bold;
  }
  </style>