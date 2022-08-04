const userRoutes = require('express').Router();
const userController = require('../Controllers/userController');


userRoutes.post('/login',userController.login);


userRoutes.post('/register',userController.register);



module.exports = userRoutes;