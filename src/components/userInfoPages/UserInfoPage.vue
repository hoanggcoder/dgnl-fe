<template>
  <div class="user-info-container">
    <h2>Thông tin của người dùng</h2>
    <form @submit.prevent="updateUserInfo">
      <div class="form-group" v-for="(field, key) in formFields" :key="key">
        <label :for="key">{{ field.label }}</label>
        <input
          v-if="key !== 'profilePicture'"
          :type="field.type"
          :id="key"
          v-model="userData[key]"
          :placeholder="field.placeholder"
          :disabled="!isEditing || key === 'role'"
          readonly="key === 'role'"
          required
        />
      </div>
      <div class="form-group">
        <label>Ảnh đại diện</label>
        <input type="file" accept="image/*" @change="handleImageUpload" :disabled="!isEditing" />
        <img v-if="previewImage" :src="previewImage" class="profile-preview" />
      </div>

      <button v-if="!isEditing" @click.prevent="toggleEdit" class="edit-btn">Thay đổi thông tin</button>
      <button v-else type="submit" class="save-btn">Lưu</button>
    </form>
    <p v-if="message" :class="{ success: isSuccess, error: !isSuccess }">{{ message }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userData: {
        id: localStorage.getItem("id"),
        role: "",
        dob: "",
        firstName: "",
        lastName: "",
        address: "",
        email: "",
        profilePicture: "",
        phoneNumber: "",
      },
      isEditing: false,
      message: "",
      isSuccess: false,
      previewImage: "",
      formFields: {
        firstName: { label: "Tên", type: "text" },
        lastName: { label: "Họ", type: "text" },
        dob: { label: "Ngày sinh", type: "date", placeholder: "YYYY-MM-DD" },
        address: { label: "Địa chỉ", type: "text" },
        phoneNumber: { label: "Số điện thoại", type: "tel", placeholder: "+1234567890" },
        email: { label: "Email", type: "email" },
        role: { label: "Vai trò", type: "text", placeholder: "Quyền hạn", disabled: true },
      },
    };
  },
  async mounted() {
    await this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      try {
        const username = localStorage.getItem("username");
        if (!username) throw new Error("Username not found in localStorage.");

        const response = await axios.get(`http://localhost:8080/user/get-info-by-username/${username}`);
        if (response.data.dob) response.data.dob = response.data.dob.split("T")[0];

        this.userData = response.data;
        this.previewImage = response.data.profilePicture;
      } catch (error) {
        console.error("Error fetching user data:", error);
        this.message = "Không thể lấy ra dữ liệu.";
        this.isSuccess = false;
      }
    },
    toggleEdit() {
      this.isEditing = true;
    },
    async updateUserInfo() {
      try {
        const username = localStorage.getItem("username");
        if (!username) throw new Error("Username not found in localStorage.");

        await axios.put(`http://localhost:8080/user/edit-info/${username}`, this.userData);

        this.message = "Thông tin người dùng đã được cập nhật!";
        this.isSuccess = true;
        this.isEditing = false;
      } catch (error) {
        console.error("Error updating user information:", error);
        this.message = "Đã có lỗi khi thực hiện cập nhật thông tin.";
        this.isSuccess = false;
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.resizeImage(e.target.result, 300, 300, (resizedImage) => {
          this.previewImage = resizedImage;
          this.userData.profilePicture = resizedImage;
        });
      };
      reader.readAsDataURL(file);
    },
    resizeImage(imageSrc, width, height, callback) {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        callback(canvas.toDataURL("image/jpeg"));
      };
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
}

.user-info-container {
  width: 100%;
  max-width: 500px;
  padding: 20px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: left; 
  align-self: center;
  justify-content: center;
  padding-top: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  max-width: 480px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.profile-preview {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-top: 10px;
  border: 2px solid #ccc;
}

.edit-btn, .save-btn {
  width: 100%;
  max-width: 200px;
  padding: 10px;
  margin-top: 15px;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s ease;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.edit-btn {
  background-color: #066506;
  color: white;
}

.edit-btn:hover {
  background-color: #054b04;
}

.save-btn {
  background-color: #066506;
  color: white;
}

.save-btn:hover {
  background-color: #054b04;
}

.success {
  color: green;
  text-align: center;
}

.error {
  color: red;
  text-align: center;
}

@media (max-width: 768px) {
  .user-info-container {
    max-width: 100%;
  }
}
</style>
