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


const server = app.listen(PORT);
// server.listen(PORT,()=>{
//     console.log('app is listening on port: '+PORT)
// });

const io = require('socket.io')(server,{cors: {origin: "http://localhost:3000",methods: ["GET", "POST"]}});
let users = [];
const addUser = (userId,socketId) => {
    !users.some(user => user.userId === userId) &&
    users.push({userId,socketId});
}
const removeUser = (socketId) => users = users.filter(user => user.socketId !== socketId);
const getUser = (userId) => users.find((user) => user.userId === userId);
io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on("addUser", (userId)=> {
    addUser(userId,socket.id);
    io.emit("getUsers",users);
  });


   socket.on("sendMessage", ({ senderId, receiverId, message,imgUrl,id,date }) => {
    console.log("send message is working!");
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage", {
        id,
        senderId,
        message,
        imgUrl,
        date
    });
  });

  socket.on("disconnect", ()=> {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers",users);
  })

});