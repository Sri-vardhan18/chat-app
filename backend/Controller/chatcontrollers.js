
const asyncHandler = require('express-async-handler')
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


const fetchChat = async (req, res, next) => {
    try {
        // Fetch chats with user and populate fields
        let results = await Chat.find({ users: req.user._id })
            .populate('users', '-password')
            .populate('isGroupAdmin', '-password')
            .populate('lastMessage', '-password')
            .sort({ updatedAt: -1 });

        // Populate the last message sender
        results = await User.populate(results, {
            path: 'lastMessage.sender',
            select: 'name email pic',
        }); 
        

        res.status(200).send(results);
    } catch (error) {
        next(error);
    }
}; 

const createGroupChat = async (req, res, next) => {
    // Check that users is an array
    if (!Array.isArray(req.body.users) || !req.body.users.length) {
      return res.status(400).json({ message: "Users must be a non-empty array" });
    }
  
    try {
      const groupchat = await Chat({
        chatName: req.body.chatName,
        isGroupChat: true,
        users: req.body.users,  // Use the array directly
        isGroupAdmin: req.user,  // Assuming req.user is set correctly
      });
  
      await groupchat.save();
  
      const result = await Chat.findOne({ _id: groupchat._id })
        .populate('users', '-password')
        .populate('isGroupAdmin', '-password');
  
      res.status(200).json(result);  
    } catch (error) {
      next(error);  
    }
  };


  const renameGroupchat = async (req, res) => {
    const { chatid, chatName } = req.body;
  
    try {
      // Attempt to update the chat with the new name
      const updated = await Chat.findByIdAndUpdate(
        chatid,
        { chatName },
        { new: true }
      );
  
     
      if (!updated) {
        return res.status(400).json({ message: 'Failed to update chat name' });
      }
  
    
      const result = await Chat.findOne({ _id: updated._id })
        .populate('users', '-password')
        .populate('isGroupAdmin', '-password');
  
      
      return res.status(200).json(result); 
    } catch (error) {
      
      return res.status(400).json({ message: error.message });
    }
  };
  

const addToGroup = asyncHandler(async (req, res) => {
    const { chatid, userid } = req.body;  

    try {
        const updatedChat = await Chat.findOneAndUpdate(
            { _id: chatid },
            {
                $addToSet: { users: userid }, 
            },
            {
                new: true,
            
            }
        );

        if (!updatedChat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        // Check if the user was successfully added
        const isUserAdded = updatedChat.users.includes(userid);
        if (!isUserAdded) {
            return res.status(400).json({ message: 'User not added' });
        }

        const result = await Chat.findById(chatid)  
            .populate('users', '-password')
            .populate('isGroupAdmin', '-password');

        res.status(200).json(result); 
    } catch (error) {
        res.status(400).json({ error: error.message }); // Fixed typo
    }
}); 

const removeFromGroup = async (req, res) => { 
    const { chatid, userid } = req.body;  
    console.log(chatid, userid)

    try {
        // Remove the user from the group
        const updatedChat = await Chat.findByIdAndUpdate(
            chatid,
            {
                $pull: { users: userid } // Use $pull to remove a specific user
            },
            { new: true } // Return the updated chat
        );

        // Check if the chat was found
        if (!updatedChat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        // Check if the user was successfully removed
        const isUserDeleted = updatedChat.users.includes(userid); 
        if (isUserDeleted) {
            return res.status(400).json({ message: 'User not deleted' });
        }

        const result = await Chat.findById(chatid)  
            .populate('users', '-password')
            .populate('isGroupAdmin', '-password');

        res.status(200).json(result); // Respond with the updated chat
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};




module.exports = { accesChat, fetchChat, createGroupChat, renameGroupchat, addToGroup, removeFromGroup };

