<template>
    <div class="user-info-container">
      <h2>User Information</h2>
      <form @submit.prevent="updateUserInfo">
        <div class="form-group" v-for="(field, key) in formFields" :key="key">
          <label :for="key">{{ field.label }}</label>
          <input
            :type="field.type"
            :id="key"
            v-model="userData[key]"
            :placeholder="field.placeholder"
            :disabled="!isEditing"
            required
          />
        </div>
  
        <button v-if="!isEditing" @click.prevent="toggleEdit" class="edit-btn">
          Edit
        </button>
        <button v-else type="submit" class="save-btn">Save</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        userData: {
          firstName: "",
          lastName: "",
          dob: "",
          address: "",
          phoneNumber: "",
          email: "",
          username: "",
          profilePicture: "",
          role: ""
        },
        isEditing: false,
        formFields: {
          firstName: { label: "First Name", type: "text", placeholder: "Enter first name" },
          lastName: { label: "Last Name", type: "text", placeholder: "Enter last name" },
          dob: { label: "Date of Birth", type: "date", placeholder: "YYYY-MM-DD" },
          address: { label: "Address", type: "text", placeholder: "Enter address" },
          phone: { label: "Phone Number", type: "tel", placeholder: "+1234567890" },
          email: { label: "Email", type: "email", placeholder: "Enter email" },
          username: { label: "Username", type: "text", placeholder: "Your username", disabled: true },
          profilePicturePath: { label: "Profile Picture", type: "text", placeholder: "Profile Picture URL" }
        }
      };
    },
    async mounted() {
      await this.fetchUserData();
    },
    methods: {
      async fetchUserData() {
        try {
          const username = localStorage.getItem("username");
          const response = await axios.get(`http://localhost:8080/user/get-info-by-username/${username}`);
          this.userData = response.data;
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      },
      toggleEdit() {
        this.isEditing = true;
      },
      async updateUserInfo() {
        try {
          await axios.put("http://localhost:8080/user/update", this.userData);
          alert("User information updated successfully!");
          this.isEditing = false;
        } catch (error) {
          alert("Error updating user information.");
          console.error(error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .user-info-container {
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
    margin-bottom: 20px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 15px;
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
    background-color: #066506;
  }
  
  .save-btn {
    background-color: #066506;
    color: white;
  }
  
  .save-btn:hover {
    background-color: #066506;
  }
  </style>