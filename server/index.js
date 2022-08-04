require('dotenv').config()
require("./config/database").connect();

const http = require('http');
const express = require('express');
const cors = require('cors');

const { API_PORT } = process.env;
const PORT = process.env.PORT || API_PORT;
const app = express();

const userRoutes = require('./routes/userRoutes');
const conversationRoutes = require('./routes/conversationRoutes');


app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(userRoutes);
app.use(conversationRoutes);


const server = http.createServer(app);
server.listen(PORT,()=>{
    console.log('app is listening on port: '+PORT)
});