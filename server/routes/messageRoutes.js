const messageRoutes = require('express').Router();
const messageController = require('../Controllers/messageController');
const verifyToken = require('../middleware/auth');

messageRoutes.post('/sendMessage',verifyToken,messageController.addMessageToConversation);
messageRoutes.get('/getMessages/:conversationId',verifyToken,messageController.getAllMessages);

module.exports = messageRoutes;