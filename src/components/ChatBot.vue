<template>
  <div>
    <button class="toggle-btn" @click="toggleChat">
      {{ isOpen ? 'V' : '💬' }}
    </button>

    <div v-if="isOpen" class="chat-container">
      <div class="chat-box">
        <div v-for="(msg, index) in messages" :key="index" :class="['message', msg.sender]">
          {{ msg.text }}
        </div>
      </div>
      <div class="input-box">
        <input v-model="userMessage" @keyup.enter="sendMessage" placeholder="Type a message..." />
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      userMessage: '',
      messages: [],
    };
  },
  methods: {
    toggleChat() {
      this.isOpen = !this.isOpen; 
    },
    async sendMessage() {
      if (!this.userMessage.trim()) return;

      this.messages.push({ text: this.userMessage, sender: 'user' });

      const userMessage = this.userMessage;
      this.userMessage = '';

      try {
        const response = await fetch('http://localhost:5005/webhooks/rest/webhook', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();
        if (data.length > 0) {
          this.messages.push({ text: data[0].text, sender: 'bot' });
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  }
};
</script>
  

<style scoped>
/* Chatbot Container */
.chat-container {
  position: fixed;
  right: 20px;
  bottom: 70px;
  width: 350px;
  height: 500px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.chat-box {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
}

.message {
  max-width: 80%;
  margin: 5px;
  padding: 10px;
  border-radius: 10px;
}

.message.user {
  background-color: #066506;
  color: white;
  align-self: flex-end;
}

.message.bot {
  background-color: #e0e0e0;
  color: black;
  align-self: flex-start;
}

/* Input Box */
.input-box {
  display: flex;
  padding: 10px;
  background: white;
  border-top: 1px solid #ccc;
}

.input-box input {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
}

.input-box button {
  padding: 10px;
  background: #066506;
  color: white;
  border: none;
  cursor: pointer;
  margin-left: 5px;
}

/* Toggle Button */
.toggle-btn {
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #fa0404;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-btn:hover {
  background: #fa0404;
}
</style>