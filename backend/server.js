const express = require('express')
const chats = require('./data/data.js') 
const dotenv = require('dotenv') 
const mongoose= require('mongoose') 
const userRoutes = require('./Routes/userRoutes.js') 
const chatRoutes = require('./Routes/chatRoutes.js')
const messageRoutes = require('./Routes/messageRoutes.js') 
const {Server} = require('socket.io')  
const { createServer } = require('http');
const path = require('path')

const app = express()    
const server=createServer(app)
dotenv.config()   
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", 
      
    },
  })
app.use(express.json()) 


const PORT = process.env.PORT || 5000


// app.get('/', (req, res)=>{
//     res.send('API Running')
// }) 

app.get('/api/chats', (req,res)=>{
    res.send(chats)
})  

app.get('/api/chats/:id', (req, res) => {
   const sindlechat=chats.find((i)=>i._id ===req.params.id)  
  
   res.send(sindlechat)
})  

app.use("/api/user", userRoutes)  
app.use("/api/chat", chatRoutes) 
app.use("/api/messages", messageRoutes)  



if (process.env.NODE_ENV === 'production') {
  // Serve static files from the frontend/build directory
  app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API Running');
  });
}



 
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log("connected to mandogb")) 
.catch((error)=>{console.log(error)})  


// app.use((req, res, next) => { 
//     res.status(404).json({ message: 'Resource not found' });
// }); 

app.use((error, req, res, next) => {
    console.error(error); 
    const statuscode = error.status || 500;
    const message = error.message || 'Internal Server Error';
    res.status(statuscode).json({ message }); // Send the error message as JSON
}); 
 


io.on('connection', (socket)=>{
    console.log('a user connected') 
    socket.on('setup',(userData)=>{
        socket.join(userData._id) 

        socket.emit("connected")
    }) 
    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
      });  

    socket.on('typing',(room)=>{socket.in(room).emit('typing')}) 
    socket.on('stop typing',(room)=>{socket.in(room).emit('stop typing')})

      socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;
    
        if (!chat.users) return console.log("chat.users not defined");
    
        chat.users.forEach((user) => {
          if (user._id == newMessageRecieved.sender._id) return;
    
          socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
      }); 

      socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
      });
})

server.listen(PORT,()=>{
    console.log(`connected to ${PORT}`)
})