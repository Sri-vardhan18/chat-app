const express = require('express') 
const authmiddleware = require('../middleware/authmiddleware') 
const {sendingmsg, fatchmsges} = require('../Controller/messageController')
const messageRoutes= express.Router()    

messageRoutes.post('/sendingmsg',authmiddleware, sendingmsg ) 
messageRoutes.get('/:chatid',authmiddleware, fatchmsges )

module.exports = messageRoutes