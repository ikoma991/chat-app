const mongoose = require('mongoose');
const {isEmail} = require('validator');
const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        validate:[isEmail,"Please Enter Correct Email"],
        unique:true,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    imageUrl:{
        type:String
    },
    token:{
        type:String
    },
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Message'
        }
    ],
    conversations:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Conversation'
        }
    ]
},{timestamps:true});

module.exports = mongoose.model("User", userSchema);
