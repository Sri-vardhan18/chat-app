
const jwt = require("jsonwebtoken"); 
const User = require('../models/User.js')
const authmiddleware = async(req, res, next) => { 
  console.log(req.header.authorization , "headers")
   let token = req.headers.authorization.split(" ")[1]
    
      try {
        // token = req.headers.authorization.split(" ")[1]; 
        const decoded = jwt.verify(token, process.env.SECRET_KEY);   
        req.user = await User.findById(decoded.id) 
        next();
      } catch (error) {
        res.status(401).json({message:error.message});  
      }
    if (!token) { 
      res.status(401).json({message:error.message});
      
    }
};

module.exports = authmiddleware