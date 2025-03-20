<template>
    <div class="management-container">
      <aside class="sidebar">
        <h3>Quản Lý</h3>
        <ul>
          <li @click="changeEntity('admin')" :class="{ active: selectedEntity === 'admin' }">Quản Trị Viên</li>
          <li @click="changeEntity('exam')" :class="{ active: selectedEntity === 'exam' }">Kỳ Thi</li>
          <li @click="changeEntity('article')" :class="{ active: selectedEntity === 'article' }">Bài Viết</li>
          <li @click="changeEntity('question')" :class="{ active: selectedEntity === 'question' }">Câu hỏi</li>
        </ul>
      </aside>
      
      <main class="content">
        <h2>Danh Sách {{ entityName }}</h2>
        <button class="add-btn" @click="addItem">➕ Thêm Mới</button>
        
        <div class="item-list">
          <div v-for="item in paginatedItems" :key="item.id" class="item">
            <p v-if="selectedEntity === 'admin'">{{ item.username }} - Vai trò :{{ item.role }}</p>
            <p v-else-if="selectedEntity === 'exam'">{{ item.name }} - Độ khó: {{ item.difficulty }}</p>
            <p v-else-if="selectedEntity === 'article'">{{ item.title }} - Chủ Đề: {{ item.topicId }}</p>
            <p v-else-if="selectedEntity === 'question'">{{ item.detail }} - Đáp án: {{ item.answer }}</p>
            <div class="actions">
              <button v-if="selectedEntity !== 'admin'" @click="editItem(item.id)">✏️</button>
              <button @click="deleteItem(item.id)">🗑</button>
            </div>
          </div>
        </div>
  
        <div class="pagination">
          <button v-for="page in totalPages" :key="page" @click="currentPage = page" :class="{ active: currentPage === page }">
            {{ page }}
          </button>
        </div>
      </main>
    </div>
  </template>
  
  <script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedEntity: "admin",
      items: [],
      currentPage: 1,
      itemsPerPage: 10,
      apiEndpoints: {
        admin: "http://localhost:8080/user",
        exam: "http://localhost:8080/exam",
        article: "http://localhost:8080/article",
        question: "http://localhost:8080/question",
      },
      token: localStorage.getItem("token"),
    };
  },
  computed: {
    entityName() {
      return this.selectedEntity === "admin" ? "Quản Trị Viên"
        : this.selectedEntity === "exam" ? "Kỳ Thi"
        : this.selectedEntity === "article" ? "Bài Viết"
        : "Câu Hỏi";
    },
    totalPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.items.slice(start, start + this.itemsPerPage);
    },
  },
  methods: {
    async fetchItems() {
      try {
        const response = await axios.get(this.apiEndpoints[this.selectedEntity], {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          }
        });
        this.items = response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    changeEntity(entity) {
      this.selectedEntity = entity;
      this.fetchItems();
    },
    addItem() {
      this.$router.push(`/add-${this.selectedEntity}`);
    },
    editItem(id) {
      this.$router.push(`/edit-${this.selectedEntity}/${id}`);
    },
    async deleteItem(id) {
      if (confirm("Bạn có chắc muốn xóa mục này?")) {
        try {
          await axios.delete(`${this.apiEndpoints[this.selectedEntity]}/${id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.token}`,
            }
          });
          this.items = this.items.filter(item => item.id !== id);
          alert("Đã xóa thành công!");
        } catch (error) {
          console.error("Lỗi khi xóa:", error);
        }
      }
    }
  },
  mounted() {
    this.fetchItems();
  }
};
</script>
  
  <style scoped>
  .management-container {
    display: flex;
  }
  
  .sidebar {
    width: 200px;
    background: #f4f4f4;
    padding: 20px;
  }
  
  .sidebar ul {
    list-style: none;
    padding: 0;
  }
  
  .sidebar li {
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .sidebar li.active {
    background: #066506;
    color: white;
  }
  
  .content {
    flex: 1;
    padding: 20px;
  }
  
  .add-btn {
    padding: 8px 12px;
    margin-bottom: 10px;
    background: #066506;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .item-list {
    display: flex;
    flex-direction: column;
  }
  
  .item {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  
  .actions button {
    margin-left: 5px;
    border: none;
    cursor: pointer;
    padding: 5px 8px;
    border-radius: 5px;
  }
  
  .pagination {
    margin-top: 10px;
  }
  
  .pagination button {
    margin: 0 5px;
    padding: 5px 10px;
    border: 1px solid #066506;
    background: white;
    cursor: pointer;
    border-radius: 3px;
  }
  
  .pagination button.active {
    background: #066506;
    color: white;
  }
  </style>