<template>
    <div class="container">
      <h1 class="title">Danh sách địa điểm thi</h1>
      <table class="exam-table">
        <thead>
          <tr>
            <th>TT</th>
            <th>Tỉnh, Thành phố</th>
            <th>Mã điểm thi</th>
            <th>Địa điểm thi</th>
            <th>Địa chỉ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(location, index) in locations" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ location.city }}</td>
            <td>{{ location.code }}</td>
            <td>{{ location.name }}</td>
            <td>{{ location.address }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const locations = ref([
    { city: "HÀ NỘI", code: "TKT", name: "Viện ĐTS & Khảo thí – Cầu Giấy", address: "Số 144 Đường Xuân Thủy, Cầu Giấy, Hà Nội"},
    { city: "HÀ NỘI", code: "QHI", name: "Trường Đại học Công nghệ - ĐHQGHN", address: "Số 144 Đường Xuân Thủy, Cầu Giấy, Hà Nội"},
    { city: "HÀ NỘI", code: "QHT", name: "Trường ĐH Khoa học Tự nhiên - ĐHQGHN", address: "Số 334 Nguyễn Trãi, Thanh Xuân, Hà Nội"},
    { city: "THÁI NGUYÊN", code: "TNU", name: "ĐH Thái Nguyên", address: "Phường Tân Thịnh, TP. Thái Nguyên, Thái Nguyên"},
    { city: "HƯNG YÊN", code: "SKH", name: "ĐH Sư phạm Kỹ thuật Hưng Yên", address: "Số 1, Đường Đỗ Thế Diên, Thị xã Mỹ Hào, Hưng Yên"},
    { city: "NAM ĐỊNH", code: "SKN", name: "ĐH Sư phạm Kỹ thuật Nam Định", address: "Phù Nghĩa, Lộc Hạ, TP. Nam Định, Nam Định"},
    { city: "THANH HÓA", code: "HDT", name: "Trường Đại học Hồng Đức", address: "Số 565 Quang Trung, Phường Đông Vệ, Thanh Hóa"},
  ]);
  </script>
  
  <style scoped>
  .container {
    max-width: 1200px;
    margin: 20px auto;
    padding: 20px;
    background: #fff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  
  .title {
    text-align: center;
    font-size: 28px;
    margin-bottom: 20px;
    color: #333;
  }
  
  .exam-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .exam-table th, .exam-table td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }
  
  .exam-table th {
    background-color: #f4f4f4;
    font-weight: bold;
  }
  
  .exam-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  </style>