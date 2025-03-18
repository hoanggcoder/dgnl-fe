<template>
  <div class="user-dashboard">
    <div class="user-info-container">
      <h2>User Information</h2>
      <form @submit.prevent="updateUserInfo">
        <div class="form-group" v-for="(field, key) in formFields" :key="key">
          <label :for="key">{{ field.label }}</label>
          <input
            v-if="key !== 'profilePicture'"
            :type="field.type"
            :id="key"
            v-model="userData[key]"
            :placeholder="field.placeholder"
            :disabled="!isEditing"
            required
          />
        </div>
        <div class="form-group">
          <label>Profile Picture</label>
          <input type="file" accept="image/*" @change="handleImageUpload" :disabled="!isEditing" />
          <img v-if="previewImage" :src="previewImage" class="profile-preview" alt="Profile Preview" />
        </div>

        <button v-if="!isEditing" @click.prevent="toggleEdit" class="edit-btn">Edit</button>
        <button v-else type="submit" class="save-btn">Save</button>
      </form>
      <p v-if="message" :class="{ success: isSuccess, error: !isSuccess }">{{ message }}</p>
    </div>

    <PersonalScore :userId=this.userData.id />
  </div>
</template>

<script>
import axios from "axios";
import PersonalScore from "./PersonalScore.vue"; 

export default {
  components: { PersonalScore }, 
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
        firstName: { label: "First Name", type: "text", placeholder: "Enter first name" },
        lastName: { label: "Last Name", type: "text", placeholder: "Enter last name" },
        dob: { label: "Date of Birth", type: "date", placeholder: "YYYY-MM-DD" },
        address: { label: "Address", type: "text", placeholder: "Enter address" },
        phoneNumber: { label: "Phone Number", type: "tel", placeholder: "+1234567890" },
        email: { label: "Email", type: "email", placeholder: "Enter email" },
        role: { label: "Role", type: "text", placeholder: "Your role", disabled: true },
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
        this.message = "Failed to load user data.";
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

        this.message = "User information updated successfully!";
        this.isSuccess = true;
        this.isEditing = false;
      } catch (error) {
        console.error("Error updating user information:", error);
        this.message = "Error updating user information.";
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
.user-dashboard {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  padding: 20px;
}

.user-info-container {
  flex: 1;
  max-width: 400px;
  padding: 20px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.personal-score-container {
  flex: 1;
  max-width: 400px;
  padding: 20px;
  background: #f5f5f5;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;
  margin-right: 15px;
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
}

.error {
  color: red;
}

@media (max-width: 768px) {
  .user-dashboard {
    flex-direction: column;
    align-items: center;
  }

  .user-info-container,
  .personal-score-container {
    max-width: 100%;
  }
}
</style>