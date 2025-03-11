<template>
  <div class="query-container">
    <label for="queryInput">Enter Query:</label>
    <textarea id="queryInput" v-model="query" class="input-box"></textarea>

    <div class="options-container">
      <label v-for="option in options" :key="option.value" class="option-box">
        <input type="checkbox" v-model="selectedOptions" :value="option.value" />
        {{ option.label }}
      </label>
    </div>

    <button @click="processQuery" class="submit-btn">Submit</button>

    <label for="outputArea">Output:</label>
    <textarea id="outputArea" v-model="output" class="output-box" readonly></textarea>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: "", 
      output: "", 
      selectedOptions: [], 
      options: [
        { label: "Option 1", value: "opt1" },
        { label: "Option 2", value: "opt2" },
        { label: "Option 3", value: "opt3" }
      ]
    };
  },
  methods: {
    processQuery() {
      this.output = `Processed Query: ${this.query}\n\nOptions: ${this.selectedOptions.join(", ")}`;
    }
  }
};
</script>

<style scoped>
.query-container {
  max-width: 600px;
  margin: auto;
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;
}

label {
  font-weight: bold;
  margin-top: 10px;
}

.input-box,
.output-box {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  margin-top: 5px;
}

.output-box {
  height: 150px;
  background-color: #ccc;
}

.options-container {
  display: flex;
  gap: 10px;
  margin: 10px 0;
}

.option-box {
  display: flex;
  align-items: center;
  gap: 5px;
}

.submit-btn {
  padding: 10px;
  background-color: #066506;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

.submit-btn:hover {
  background-color: #066506;
}
</style>