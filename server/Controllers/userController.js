const User = require('../models/userModel');
const Conversation = require('../models/conversationModel');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const {updateConversations} = require('./conversationController');

const userController = {};

userController.register =  async (req,res)=>{
    try{
        const {name,email,password} = req.body;
        const trimmedName = validator.trim(name);
        const sanitizedName = validator.escape(trimmedName);
        const sanitizedEmail = validator.trim(email);
        const sanitizedPassword = validator.trim(password);

        if( !(sanitizedName&&sanitizedEmail&&sanitizedPassword) ){
            return res.status(400).send("Please fill all inputs!");
        }
        if(!validator.isEmail(sanitizedEmail)){
            return res.status(400).send("Invalid email format!");
        }
        if(!validator.isAlphanumeric(sanitizedName)){
            return res.status(400).send("Name should only contain Alphabets and Numbers");
        }
        const oldUser = await User.findOne({email:sanitizedEmail}).exec();
        if(oldUser){
            return res.status(409).send("User already exists!");
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            name:sanitizedName,
            password:hashedPassword,
            email:validator.normalizeEmail(sanitizedEmail)
        });
        const token = jwt.sign(
            {
                user_id:user._id,
                email:user.email
            },
        
            process.env.TOKEN_KEY,
            {
            expiresIn:'2h',
            });
        user.token = token;
        const allUsers = await User.find({_id:{ $ne: user._id }}).exec();
        const conversationArr = allUsers.map(usr =>  ({name:"",users:[usr._id,user._id],messages:[],imageUrl:usr.imageUrl} )  );
        const conversations = await Conversation.insertMany(conversationArr);
        user.conversations = conversations.map(conv => conv._id);
        user.save();
        updateConversations(allUsers);
        
        res.status(201).json({
            id:user._id,
            email:user.email,
            token:user.token,
        });

    }catch(err){
        console.log(err);
    }
};

userController.login =  async (req,res)=>{
        try{
            const{email,password} = req.body;
            const sanitizedEmail = validator.trim(email);
            if( !(email&&password) ){
                return res.status(400).send("Please enter email and password!");
            }
            if(!validator.isEmail(sanitizedEmail)){
                return res.status(400).send("Invalid Email format!");
            }

            const user = await User.findOne({email:sanitizedEmail});
            if(!user){
                return res.status(400).send("User does not exist!");
            }

            const checkPassword = await bcrypt.compare(password,user.password);
            
            if(!checkPassword){
                return res.status(400).send("Wrong password!");
            }
            if(user && checkPassword){
                const token = jwt.sign(
                    { user_id: user._id,email: user.email },
                    process.env.TOKEN_KEY,
                    {
                    expiresIn: "2h",
                    }
                    );
                user.token = token;
                user.save();

                res.status(200).json(
                    {
                        id: user._id,
                        token:user.token,
                        email:user.email,
                        name:user.name,
                        img:user.imgUrl
                    });
            }

        }catch(err){
            console.log(err);
        }
    };


module.exports = userController;