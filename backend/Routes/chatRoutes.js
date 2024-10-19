const express = require('express') 
const {accesChat, fetchChat, createGroupChat, renameGroupchat, addToGroup, removeFromGroup}= require('../Controller/chatcontrollers.js')
const authmiddleware = require('../middleware/authmiddleware.js')
const chatRoutes = express.Router() 



chatRoutes.get('/', authmiddleware, accesChat)  
chatRoutes.get('/fetch', authmiddleware, fetchChat)  
chatRoutes.post('/create',authmiddleware,createGroupChat )
chatRoutes.put('/renamegroup',authmiddleware,renameGroupchat ) 
chatRoutes.put('/addtogroup',authmiddleware,addToGroup ) 
chatRoutes.put('/removefromgroup',authmiddleware,removeFromGroup )

module.exports =chatRoutes