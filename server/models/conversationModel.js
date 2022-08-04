const mongoose = require('mongoose');
const conversationSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
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
