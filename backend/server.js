const express = require('express')
const chats = require('./data/data.js') 
const dotenv = require('dotenv')

const app = express()   
dotenv.config() 

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

app.listen(PORT,()=>{
    console.log(`connected to ${PORT}`)
})