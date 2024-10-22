const Chat = require("../models/chatModels");
const Message = require("../models/messageModel");
const User = require("../models/User");

const sendingmsg = async (req, res) => {
  const { chatid, content } = req.body;
  if (!chatid || !content) {
    return res.status(400).json({ message: "chaid and message is required" });
  }
  const newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatid,
  };

  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatid, { lastMessage: message });
    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const fatchmsges = async (req,res) => {
  try {
    const message = await Message.find({ chat: req.params.chatid })
      .populate("sender", "name pic email")
      .populate("chat");
    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { sendingmsg, fatchmsges };
