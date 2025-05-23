<template>
  <div class="management-container">
    <aside class="sidebar">
      <h3>Quản Lý</h3>
      <ul>
        <li @click="changeEntity('admin')" :class="{ active: selectedEntity === 'admin' }">Quản Trị Viên</li>
        <li @click="changeEntity('article')" :class="{ active: selectedEntity === 'article' }">Bài Viết</li>
        <li @click="changeEntity('question')" :class="{ active: selectedEntity === 'question' }">Câu Hỏi</li>
        <li @click="changeEntity('exam')" :class="{ active: selectedEntity === 'exam' }">Kỳ Thi</li>
        <li @click="changeEntity('other')" :class="{ active: selectedEntity === 'other' }">Khác</li>
      </ul>
    </aside>
    <main class="content" v-if="selectedEntity !== 'other'">
      <h2>Danh Sách {{ entityName }}</h2>
      <div class="search-bar">
        <input type="text" v-model="searchQuery" placeholder="Tìm kiếm..." />
      </div>
      <button class="add-btn" @click="addItem">Thêm Mới</button>
      <table class="data-table">
        <thead>
          <tr>
            <th v-for="header in tableHeaders" :key="header">{{ header }}</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in paginatedItems" :key="item.id">
            <td v-for="field in tableFields()" :key="field">
              {{ formatField(item[field], field) }}
            </td>
            <td class="actions">
              <button v-if="selectedEntity !== 'admin'" class="edit-btn" @click="editItem(item.id)">✏️</button>
              <button v-if="selectedEntity === 'question'" class="daily-btn" @click="addDaily(item.id)">⭐</button>
              <button class="delete-btn" @click="deleteItem(item.id)">🗑</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <button v-for="page in totalPages" :key="page" @click="currentPage = page" :class="{ active: currentPage === page }">
          {{ page }}
        </button>
      </div>
    </main>
    <main class="content" v-else>
      <button class="minigame-btn" @click="editMinigame">Quản lý minigame</button>
    </main>
  </div>
</template>
<script>
  import axios from "axios";
  export default {
    data() {
      return {
        selectedEntity: "admin",
        difficultyMap: {
          easy: 'Dễ',
          medium: 'Trung Bình',
          hard: 'Khó'
        },
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
        searchQuery: "",
      };
    },
    computed: {
      entityName() {
        return this.selectedEntity === "admin" ? "Quản Trị Viên" : this.selectedEntity === "exam" ? "Kỳ Thi" : this.selectedEntity === "article" ? "Bài Viết" : "Câu Hỏi";
      },
      tableHeaders() {
        switch (this.selectedEntity) {
          case "admin":
            return ["Tên đăng nhập", "Vai trò"];
          case "exam":
            return ["Tên kỳ thi", "Độ khó"];
          case "article":
            return ["Tiêu đề", "Chủ đề", "Mô tả"];
          case "question":
            return ["Nội dung", "Đáp án"];
          default:
            return [];
        }
      },
      totalPages() {
        return Math.max(1, Math.ceil(this.filteredItems.length / this.itemsPerPage));
      },
      paginatedItems() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        return this.filteredItems.slice(start, start + this.itemsPerPage);
      },
      filteredItems() {
        return this.items.filter(item => {
          let searchField;
          switch (this.selectedEntity) {
            case "admin":
              searchField = "username";
              break;
            case "exam":
              searchField = "name";
              break;
            case "article":
              searchField = "title";
              break;
            case "question":
              searchField = "detail";
              break;
            default:
              searchField = "name";
          }
          return item[searchField]?.toLowerCase().includes(this.searchQuery.toLowerCase());
        });
      },
    },
    methods: {
      async fetchItems() {
        try {
          if (this.selectedEntity === "admin") {
            const response = await axios.get('http://localhost:8080/user/admin', {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`,
              }
            });
            this.items = response.data;
          } else {
            const response = await axios.get(this.apiEndpoints[this.selectedEntity], {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`,
              }
            })
            this.items = response.data;
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      },
      tableFields() {
        switch (this.selectedEntity) {
          case "admin":
            return ["username", "role"];
          case "exam":
            return ["name", "difficulty"];
          case "article":
            return ["title", "topicId", "description"];
          case "question":
            return ["detail", "answer"];
          default:
            return [];
        }
      },
      formatField(value, field) {
        if (field === 'difficulty') {
          return this.difficultyMap[value] || value;
        }
        return value;
      },
      changeEntity(entity) {
        this.selectedEntity = entity;
        this.currentPage = 1;
        this.searchQuery = "";
        this.fetchItems();
      },
      watch: {
        searchQuery() {
          this.currentPage = 1;
        }
      },
      addItem() {
        this.$router.push(`/add-${this.selectedEntity}`);
      },
      editMinigame() {
        this.$router.push(`/edit-minigame`);
      },
      editItem(id) {
        this.$router.push(`/edit-${this.selectedEntity}/${id}`);
      },
      async addDaily(id) {
        if (confirm("Bạn có chắc muốn đặt đây làm câu hỏi của ngày này?")) {
          try {
            await axios.post(`${this.apiEndpoints[this.selectedEntity]}/${id}`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`,
              }
            });
            alert("Đã đặt thành công!");
          } catch (error) {
            console.error("Lỗi khi xóa:", error);
          }
        }
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
    height: 400px;
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
    transition: 0.3s;
  }

  .sidebar li:hover {
    background: #ddd;
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
    transition: 0.3s;
  }

  .add-btn:hover {
    background: #055005;
  }

  .data-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  .data-table th,
  .data-table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
  }

  .data-table th {
    background-color: #f4f4f4;
  }

  .data-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  .data-table tr:hover {
    background-color: #f1f1f1;
  }

  .actions {
    display: flex;
    gap: 8px;
  }

  .edit-btn,
  .delete-btn,
  .daily-btn {
    border: none;
    padding: 6px 10px;
    cursor: pointer;
    border-radius: 5px;
  }

  .daily-btn {
    background: #7b7c7b;
    color: black;
  }

  .daily-btn:hover {
    background: #7b7c7b;
  }

  .edit-btn {
    background: #066506;
    color: black;
  }

  .edit-btn:hover {
    background: #066506;
  }

  .delete-btn {
    background: #dc3545;
    color: white;
  }

  .delete-btn:hover {
    background: #c82333;
  }

  .pagination {
    margin-top: 20px;
  }

  .pagination button {
    margin: 5px;
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

  .search-bar {
    margin-bottom: 10px;
  }

  .search-bar input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .minigame-btn {
    background-color: #066506;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.75rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
  }

  .minigame-btn:hover {
    background-color: #066506;
    transform: translateY(-2px);
  }

  .minigame-btn:active {
    background-color: #066506;
    transform: translateY(0);
  }
</style>