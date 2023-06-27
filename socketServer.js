const express = require ('express')
const http = require ('http')
const app = express()
const server = http.createServer(app)

const {Server} = require('socket.io')
const io = new Server (server,{
  cors:{
    origin:"*"
  }
})

io.on("connection",(socket)=>{
  console.log("client  connected Successfully")
  socket.on("message",(message)=>{
    console.log("recieved Message " + message.toString())
    socket.broadcast.emit("message","I am fine and you")
  })
  socket.on("news",(message)=>{
    console.log("Recieved Message "+ message.toString())
    io.emit('news', " Wow congratulations man")

  })
  socket.on("addExecutive",(message)=>{
    console.log("Recieved Message "+ message)
    socket.broadcast.emit('addExecutive', " I am a new executive")
  })
})

server.listen(3001,()=>{
  console.log("socket server listening on port 3001")
})