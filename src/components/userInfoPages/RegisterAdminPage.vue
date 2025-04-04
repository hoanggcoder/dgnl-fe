<template>
    <div class="register-container">
      <h2>Thêm quản trị viên mới</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group" v-for="(field, key) in formFields" :key="key">
          <label :for="key">{{ field.label }}</label>
          <input
            :type="field.type"
            :id="key"
            v-model="formData[key]"
            :placeholder="field.placeholder"
            @blur="validateField(key)"
            required
          />
          <p v-if="errors[key]" class="error-message">{{ errors[key] }}</p>
        </div>
  
        <button type="submit" class="submit-btn">Thêm</button>
      </form>
    </div>
  </template>
  
<script>
import axios from "axios";
  export default {
    data() {
      return {
        formData: {
          firstName: '',
          lastName: '',
          dob: '',
          address: '',
          phone: '',
          email: '',
          username: '',
          password: '',
          universityId: null
        },
        errors: {},
        formFields: {
          firstName: { label: "Tên", type: "text", min: 2, max: 15 },
          lastName: { label: "Họ", type: "text", min: 2, max: 15 },
          dob: { label: "Ngày sinh", type: "date", placeholder: "YYYY-MM-DD" },
          address: { label: "Địa chỉ", type: "text", min: 5, max: 255 },
          phone: { label: "Số điện thoại", type: "tel", placeholder: "+1234567890", pattern: /^(\+?[0-9]{10,15})$/ },
          email: { label: "Email", type: "email" },
          username: { label: "Tên đăng nhập", type: "text", min: 4, max: 20, pattern: /^[a-zA-Z][a-zA-Z0-9_]*$/ },
          password: { label: "Mật khẩu", type: "password", min: 8, max: 20 },
          universityId: { label: "UID", type: "number" }
        }
      };
    },
    methods: {
      validateField(key) {
        let value = this.formData[key];
        let rules = this.formFields[key];
  
        if (!value) {
          this.errors[key] = `${rules.label} cannot be empty`;
          return;
        }
  
        if (rules.min && value.length < rules.min) {
          this.errors[key] = `${rules.label} must be at least ${rules.min} characters`;
          return;
        }
  
        if (rules.max && value.length > rules.max) {
          this.errors[key] = `${rules.label} must be at most ${rules.max} characters`;
          return;
        }
  
        if (rules.pattern && !rules.pattern.test(value)) {
          this.errors[key] = `Invalid ${rules.label} format`;
          return;
        }
  
        this.errors[key] = "";
      },
      async submitForm() {
      Object.keys(this.formData).forEach((key) => this.validateField(key));

      if (Object.values(this.errors).some((err) => err)) {
        alert("Sửa lại các lỗi trước khi nhấn nút thêm");
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const response = await axios.post("http://localhost:8080/user/create-admin", this.formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        alert(response.data.message || "Đã thêm quản trị viên mới thành công!");
        console.log(response.data);
        this.$router.push("/manage"); 
      } catch (error) {
        if (error.response && error.response.data) {
          alert(error.response.data.message || "Thêm mới thất bại!");
        } else {
          alert("Không thể kết nối tới server");
        }
      }
    }
    }
  };
</script>  
  
<style scoped>
.register-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center; 
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;
  padding-right: 20px;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

.submit-btn {
  width: 100%;
  max-width: 200px;
  padding: 10px;
  margin-top: 15px;
  border: none;
  border-radius: 20px;
  background-color: #066506;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s ease;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.submit-btn:hover {
  background-color: #044404;
}
</style>