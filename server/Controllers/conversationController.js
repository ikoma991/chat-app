const User = require('../models/userModel');
const Conversation = require('../models/conversationModel');
const Message = require('../models/messageModel');
const validator = require('validator')

const conversationController = {};
conversationController.getAllConversations= async (req,res) =>{
 const userId = validator.trim(req.body.userId);
 try{
     const user = await User.findOne({_id:userId}).populate({path: 'conversations',populate: [{path:'messages'},{path:'users'}]}).exec();
     // Unread Count will be calculated through message unread by property 
     const orderedConversationData = user.conversations.map(conv => ({id:conv._id,name:conv.name?conv.name:conv.users.filter(usr=> usr._id != userId)[0].name ,imageUrl: conv.imageUrl ? conv.imageUrl : "",lastMessage:conv.messages[conv.messages.length-1] ? conv.messages[conv.messages.length-1].message : "Start a new conversation!",unreadCount:0 }) );
     res.status(201).json({
        conversations: orderedConversationData
     })
}catch(err){
    console.log(err);
}

}

conversationController.updateConversations = users => {
    users.forEach(async usr => {
            const allConversations = await Conversation.find({}).exec();
            const filteredConversations = allConversations.filter(conv=> conv.users.includes(usr._id) );
            filteredConversations.forEach(async conv => {await User.findByIdAndUpdate(usr._id,{$addToSet:{conversations:conv._id}},{new:true})}); 
        });
}

conversationController.getConversationName = async (req,res) => {
    const userId = req.body.userId;
    const conversationId = req.body.conversationId;
    const conversation = await Conversation.findOne({_id:conversationId}).populate('users').exec();
    let conversationName = "";
    if(!conversation.name){
        conversationName = conversation.users.filter(usr => usr._id !== userId)[0].name;
    }else {
        conversationName = conversation.name;
    }
    res.status(201).json({conversationName});
}

module.exports = conversationController;