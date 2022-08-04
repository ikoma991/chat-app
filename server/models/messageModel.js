const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    unreadBy:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    conversation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Conversation'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }

},{timestamps:true});

module.exports = mongoose.model("Message", messageSchema);
