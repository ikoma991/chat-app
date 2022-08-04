const mongoose = require('mongoose');
const conversationSchema = new mongoose.Schema({
    name: {
        type:String,
    },
     imageUrl:{
        type:String
    },
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Message'
        }
    ],
    users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ]
},{timestamps:true});

module.exports = mongoose.model("Conversation", conversationSchema);
