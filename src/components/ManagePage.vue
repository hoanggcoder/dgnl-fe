<template>
  <div class="management-container">
    <nav class="nav-bar">
      <h1>Quản Lý</h1>
    </nav>

    <p class="description">
      Chào mừng bạn đến với trang quản lý. Vui lòng chọn một danh mục để quản lý nội dung.
    </p>

    <div class="management-sections">
      <div class="section">
        <h2>Quản lý bài viết</h2>
        <p>Thêm, sửa hoặc xóa các bài viết</p>
        <div class="btn-group">
          <router-link to="/add-article">
            <button class="action-btn">Thêm</button>
          </router-link>
          <router-link to="/article-list-edit">
            <button class="action-btn">Sửa</button>
          </router-link>
        </div>
      </div>

      <div class="section">
        <h2>Quản lý cuộc thi</h2>
        <p>Tạo mới hoặc xóa cuộc thi.</p>
        <div class="btn-group">
          <router-link to="/add-exam">
            <button class="action-btn">Thêm</button>
          </router-link>
          <router-link to="/exam-list-edit">
            <button class="action-btn">Xóa</button>
          </router-link>
        </div>
      </div>

      <div class="section">
        <h2>Quản lý người dùng</h2>
        <p>Xem danh sách người dùng và tạo tài khoản quản lý</p>
        <div class="btn-group">
          <router-link to="/add-admin">
            <button class="action-btn">Thêm</button>
          </router-link>
          <router-link to="/user-list">
            <button class="action-btn">Thông tin người dùng</button>
          </router-link>
        </div>
      </div>

      <div class="section">
        <h2>Quản lý câu hỏi</h2>
        <p>Tạo mới, chỉnh sửa hoặc xóa câu hỏi.</p>
        <div class="btn-group">
          <router-link to="/add-question">
            <button class="action-btn">Thêm</button>
          </router-link>
          <router-link to="/question-list-edit">
            <button class="action-btn">Sửa</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.management-container {
  text-align: center;
  padding: 20px;
  max-width: 800px;
  margin: auto;
}

.nav-bar {
  background-color: #7b7c7b;
  color: white;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.description {
  font-size: 16px;
  color: #555;
  margin-bottom: 30px;
}

.management-sections {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.section {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: 0.3s ease-in-out;
}

.section:hover {
  transform: scale(1.02);
}

h2 {
  margin-bottom: 10px;
  color: #333;
}

p {
  color: #666;
  margin-bottom: 15px;
}

.btn-group {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.action-btn {
  background-color: #28a745;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s ease;
}

.action-btn:hover {
  background-color: #218838;
}

.danger {
  background-color: #dc3545;
}

.danger:hover {
  background-color: #c82333;
}
</style>