<template>
    <div class="change-password-container">
      <h2>Đổi mật khẩu</h2>
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
  
        <button type="submit" class="submit-btn">Cập nhật mật khẩu</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        formData: {
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        },
        errors: {},
        formFields: {
          currentPassword: { label: "Mật khẩu hiện tại", type: "password" },
          newPassword: { label: "Mật khẩu mới", type: "password", min: 8, max: 20 },
          confirmPassword: { label: "Xác nhận mật khẩu", type: "password" }
        }
      };
    },
    methods: {
      validateField(key) {
        let value = this.formData[key];
        let rules = this.formFields[key];
  
        if (!value) {
          this.errors[key] = `${rules.label} không được để trống`;
          return;
        }
  
        if (rules.min && value.length < rules.min) {
          this.errors[key] = `${rules.label} phải có ít nhất ${rules.min} ký tự`;
          return;
        }
  
        if (rules.max && value.length > rules.max) {
          this.errors[key] = `${rules.label} không được vượt quá ${rules.max} ký tự`;
          return;
        }
  
        if (key === "confirmPassword" && value !== this.formData.newPassword) {
          this.errors[key] = "Xác nhận mật khẩu không khớp";
          return;
        }
  
        this.errors[key] = "";
      },
      async submitForm() {
        Object.keys(this.formData).forEach((key) => this.validateField(key));
  
        if (Object.values(this.errors).some((err) => err)) {
          alert("Vui lòng sửa lỗi trước khi gửi!");
          return;
        }
  
        try {
          const token = localStorage.getItem("token");
          const response = await axios.post("http://localhost:8080/auth/change-password", {
            currentPassword: this.formData.currentPassword,
            newPassword: this.formData.newPassword
          }, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          });
  
          alert(response.data.message || "Đổi mật khẩu thành công!");
          this.$router.push("/");
        } catch (error) {
          if (error.response && error.response.data) {
            alert(error.response.data.message || "Đổi mật khẩu thất bại!");
          } else {
            alert("Không thể kết nối đến server.");
          }
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .change-password-container {
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
  