const User = require('../models/userModel');
const Conversation = require('../models/conversationModel');
const Message = require('../models/messageModel');
const asyncHandler = require('express-async-handler');

const messageController = {};

messageController.createMessage = asyncHandler ( async (userId,conversationId,message) => {
    const conversation = await Conversation.findOne({_id: conversationId});
    const usersInConversation = conversation.users;
    const messageData = await Message.create({message,conversation:conversationId,user:userId,unreadBy:usersInConversation.filter(usr => usr._id != userId)});
    if(messageData){
        conversation.messages.push(messageData._id);
        conversation.save();
        await User.findByIdAndUpdate(userId,{$addToSet:{messages:messageData._id}},{new:true});
        const data = await Message.findOne(messageData._id).populate('user').exec();
        const organizedData = {id:messageData._id,message:messageData.message,imageUrl:data.user.imageUrl ? data.user.imageUrl : "",date:messageData.createdAt,userId,members: usersInConversation.filter(usr => usr._id != userId) }
        return organizedData;
}}
);

messageController.getAllMessages = asyncHandler(async (req,res) => {
    const conversationId = req.params.conversationId;
    if(conversationId == null) {
        res.status(404).json({error:"Conversation Id is required!"});
    }
    const conversation = await Conversation.findOne({_id:conversationId}).populate('messages').populate('users').exec();
    if(conversation) {
        const messages = conversation.messages;
        const organizedMessagesArrayOfPromises  = messages.map(async msg => {
                const messageWithUser = await Message.findOne({_id: msg._id}).populate('user').exec();
                const user = messageWithUser.user;
                const {imageUrl} = user;
                const userId = user._id;
                return {id:msg._id,date:msg.createdAt,message:msg.message,userId,imgUrl:imageUrl ? imageUrl : ""};
        });
        const organizedMessages = await Promise.all(organizedMessagesArrayOfPromises);
        const organizedData = {messagesList: organizedMessages};
        res.status(201).json({organizedData});
    }
});

messageController.readByUser = asyncHandler(async (userId,messageId) => {
    const newUnreadBy = Message.findOne({_id:messageId}).unreadBy.filter(usr = usr._id != userId);
    console.log(newUnreadBy);
});

messageController.addMessageToConversation = asyncHandler( async (req,res) => {
    const conversationId = req.body.conversationId;
    const message = req.body.message;
    const userId = req.user.user_id;
        const data = messageController.createMessage(userId,conversationId,message);
        if(data) {
            const dataToSend = await data;
            res.status(201).json({
                ...dataToSend
            })
        }
});

module.exports = messageController;