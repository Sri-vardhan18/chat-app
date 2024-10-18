const express = require('express')
const { userRegister, userLogin, searchUser } = require("../Controller/userController.js")
const userRoutes = express.Router() 
const authmiddleware = require('../middleware/authmiddleware.js')

userRoutes.post('/', userRegister)  
userRoutes.post('/login', userLogin)   
userRoutes.get('/', authmiddleware,searchUser) 


module.exports = userRoutes
