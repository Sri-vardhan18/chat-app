
const Chat= require('../models/chatModels.js')
const User = require('../models/User')



const accesChat = async (req, res, next) => {
    const { userid } = req.body;  
    if (!userid) { 
        return res.status(400).json({ message: 'User ID not provided' }); // Added message for clarity
    } 

    var isChat = await Chat.find({ 
        isGroupChat: false,
        users: { $all: [req.user._id, userid] } 
    })
    .populate("users", "-password") 
    .populate('lastMessage'); 

    isChat = await User.populate(isChat, {
        path: 'lastMessage.sender', // Ensure this matches your schema
        select: "name pic email"
    });  
   

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: 'sender',
            isGroupChat: false,
            users: [req.user._id, userid]
        };  
       

        try {
            const createdChat = await Chat.create(chatData);  
           
            const FullChat = await Chat.findOne({ _id: createdChat._id })
                .populate("users", "-password");  
           
            res.status(200).send(FullChat); 

        } catch (error) {
            res.status(400).json({ message: error.message }); // Corrected from state(400)
        }
    }
};

module.exports = { accesChat };

