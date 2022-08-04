const conversationRoutes = require('express').Router();
const conversationController = require('../Controllers/conversationController');
const verifyToken = require('../middleware/auth');

conversationRoutes.post('/getConversations',verifyToken,conversationController.getAllConversations);
conversationRoutes.post('/getConversationName',verifyToken,conversationController.getConversationName);

module.exports = conversationRoutes;