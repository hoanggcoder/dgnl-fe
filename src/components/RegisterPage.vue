<template>
    <div class="register-container">
      <h2>Register</h2>
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
  
        <button type="submit" class="submit-btn">Register</button>
      </form>
    </div>
  </template>
  
<script>
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
          firstName: { label: "First Name", type: "text", placeholder: "Enter first name", min: 2, max: 15 },
          lastName: { label: "Last Name", type: "text", placeholder: "Enter last name", min: 2, max: 15 },
          dob: { label: "Date of Birth", type: "date", placeholder: "YYYY-MM-DD" },
          address: { label: "Address", type: "text", placeholder: "Enter address", min: 5, max: 255 },
          phone: { label: "Phone Number", type: "tel", placeholder: "+1234567890", pattern: /^(\+?[0-9]{10,15})$/ },
          email: { label: "Email", type: "email", placeholder: "Enter email" },
          username: { label: "Username", type: "text", placeholder: "Choose a username", min: 4, max: 20, pattern: /^[a-zA-Z][a-zA-Z0-9_]*$/ },
          password: { label: "Password", type: "password", placeholder: "Enter password", min: 8, max: 20 },
          universityId: { label: "University ID", type: "number", placeholder: "Enter University ID" }
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
      submitForm() {
        Object.keys(this.formData).forEach((key) => this.validateField(key));
  
        if (Object.values(this.errors).some((err) => err)) {
          alert("Please fix the errors before submitting.");
          return;
        }
  
        console.log("Form submitted successfully", this.formData);
        alert("Registration successful!");
      }
    }
  };
</script>  
  
<style scoped>
   .register-container {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    border-radius: 10px;
    background: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  h2 {
    margin-bottom: 15px;
  }
  
  .form-group {
    margin-bottom: 15px;
    text-align: left;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .error-message {
    color: #fa0404;
    font-size: 12px;
  }
  
  .submit-btn {
    width: 100%;
    padding: 10px;
    background-color: #066506;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s ease-in-out;
  }
  
  .submit-btn:hover {
    background-color: #066506;
  }  
</style>