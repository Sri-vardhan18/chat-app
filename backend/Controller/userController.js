
const asyncHandler = require('express-async-handler')
const bcryptjs= require('bcryptjs')
const User = require("../models/User.js")  
const GenerateToken= require('../config/GenerateToken.js') 

const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}; 

const errorhandler=(message, statuscode)=>{
    const error =new Error() 
    error.message = message
    error.statuscode = statuscode 
    return error 
}


const userRegister = asyncHandler(async (req, res, next) => {
    const { name, email, password, pic } = req.body;

    // Input validation
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    } 

    if (!isValidEmail(email)) {
        const error = new Error('Invalid email format.'); // Create an Error object
        error.statusCode = 300; 
        
        return next(error); 
    }
    try {    
      
        const findUser = await User.findOne({ email });
        if (findUser) throw new Error("User already exists.");

        const hashPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({ name, email, password: hashPassword, pic });

        await newUser.save();
        res.status(201).json({
            name: newUser.name,
            email: newUser.email,
            id: newUser._id,
            pic: newUser.pic,
            token: GenerateToken(newUser._id),
        });
    } catch (error) {
        console.error(error, "hello"); 
         
    }
});
   


const userLogin=asyncHandler(async(req, res)=>{  
    const {email, password}= req.body
    try{ 
        const validuser=await User.findOne({email})  
        if(!validuser) throw new Error('user is not existed') 
        const validpassword =bcryptjs.compareSync(password, validuser.password ) 
        if(!validpassword) throw new Error('Please correct the password')  
        res.status(200).json({ name: validuser.name,
            email: validuser.email,
            id: validuser._id,
            pic: validuser.pic,
            token: GenerateToken(validuser._id),})
    } 
    catch(error){ 
        res.status(400).json(error.message)
    }
}) 

const searchUser = asyncHandler(async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
  
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
  });

module.exports ={userRegister, userLogin, searchUser}