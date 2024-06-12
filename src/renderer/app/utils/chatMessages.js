// utils/chatMessages.js

// Initial structure for storing messages by chat ID
const messagesByChatId = {};

const chatMessages = {
  // Retrieve messages for a specific chat ID
  getMessages: function(chatId) {
    if (!messagesByChatId[chatId]) {
      messagesByChatId[chatId] = []; // Initialize if not already present
    }
    return messagesByChatId[chatId];
  },

  // Add a message to a specific chat ID
  addMessage: function(chatId, message) {
    if (!messagesByChatId[chatId]) {
      messagesByChatId[chatId] = [];
    }
    messagesByChatId[chatId].push(message);
  }
};

export default chatMessages;
