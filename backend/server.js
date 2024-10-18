const express = require('express')
const chats = require('./data/data.js') 
const dotenv = require('dotenv') 
const mongoose= require('mongoose') 
const userRoutes = require('./Routes/userRoutes.js') 
const chatRoutes = require('./Routes/chatRoutes.js')

const app = express()   
dotenv.config() 
app.use(express.json()) 


const PORT = process.env.PORT || 5000


app.get('/', (req, res)=>{
    res.send('API Running')
}) 

app.get('/api/chats', (req,res)=>{
    res.send(chats)
})  

app.get('/api/chats/:id', (req, res) => {
   const sindlechat=chats.find((i)=>i._id ===req.params.id)  
  
   res.send(sindlechat)
})  

app.use("/api/user", userRoutes)  
app.use("/api/chat", chatRoutes)

 
mongoose.connect(process.env.MONGODB_URL)
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


app.listen(PORT,()=>{
    console.log(`connected to ${PORT}`)
})