require('dotenv').config()
require("./config/database").connect();

const http = require('http');
const express = require('express');
const cors = require('cors');
const asyncHandler = require('express-async-handler');

const { API_PORT } = process.env;
const PORT = process.env.PORT || API_PORT;
const app = express();

const User = require('./models/userModel');

const userRoutes = require('./routes/userRoutes');
const conversationRoutes = require('./routes/conversationRoutes');
const messageRoutes = require('./routes/messageRoutes');
const verifyToken = require('./middleware/auth');

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.post('/auth',verifyToken, asyncHandler(async (req,res) => {
    const user = await User.findOne({_id:req.user.user_id});
    res.status(201).json({id: req.user.user_id, email:req.user.email,name:user.name,imgeUrl:user.imageUrl ? user.imageUrl : ""});
}));
app.use(userRoutes);
app.use(conversationRoutes);
app.use(messageRoutes);


const server = http.createServer(app);
server.listen(PORT,()=>{
    console.log('app is listening on port: '+PORT)
});