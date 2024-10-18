const express = require('express') 
const {accesChat}= require('../Controller/chatcontrollers.js')
const authmiddleware = require('../middleware/authmiddleware.js')
const chatRoutes = express.Router() 



chatRoutes.get('/', authmiddleware, accesChat) 

module.exports =chatRoutes