const User = require('../models/userModel');
const Conversation = require('../models/conversationModel');
const mongoose = require('mongoose');
const validator = require('validator')

const conversationController = {};
conversationController.getAllConversations= async (req,res) =>{
 const userId = validator.trim(req.body.userId);
 try{
     const user = await User.findOne({_id:userId}).populate("conversations");
     res.status(201).json({
        conversations: user.conversations
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

module.exports = conversationController;