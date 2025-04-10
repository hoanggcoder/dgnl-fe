<template>
  <div>
    <button v-if="!isOpen" class="toggle-btn" @click="toggleChat">
      💬
    </button>

    <div v-if="isOpen" class="chat-container">
      <div class="chat-header">
        <span>Chatbot hỏi đáp về ĐGNL</span>
        <button class="close-btn" @click="toggleChat">❌</button>
      </div>

      <div class="chat-box">
        <div v-for="(msg, index) in messages" :key="index" :class="['message', msg.sender]">
          {{ msg.text }}
        </div>
      </div>

      <div class="input-box">
        <input v-model="userMessage" @keyup.enter="sendMessage" placeholder="Nhập câu hỏi liên quan tới kỳ thi ĐGNL" />
        <button @click="sendMessage">Gửi</button>
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
        const response = await fetch('http://localhost:8080/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question: userMessage }),
        });

        const data = await response.json();
        if (data.answer) {
          this.messages.push({ text: data.answer, sender: 'bot' });
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  }
};
</script>
  

<style scoped>
.chat-container {
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 350px;
  height: 500px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 9999;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-weight: bold;
  background-color: #066506;
  color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.close-btn {
  border: none; 
  background: transparent;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

.close-btn:hover {
  color: #ffdede;
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

.toggle-btn {
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #fa0404;
  color: white;
  border: none;
  font-size: 32px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s, transform 0.2s;
}

.toggle-btn:hover {
  background: #e00404;
  transform: scale(1.08);
}

</style>
