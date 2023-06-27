const express = require ('express')
const http = require ('http')
const app = express()
const server = http.createServer(app)
const axios = require('axios')


const {Server} = require('socket.io')
const io = new Server (server,{
  cors:{
    origin:"*"
  }
})

io.on("connection",(socket)=>{
  console.log("client  connected Successfully")
  socket.on("addExecutive",(clubId)=>{
    console.log("addExecutive event recieved" + clubId)
    const fetchClub = async()=>{
      const res = await axios.get(`http://localhost:3000/api/admin/register/${clubId}`)
      const club =await res.data
      socket.emit("updatedClubExecutives",club)
    }
    fetchClub()
  })
  

  
})

server.listen(3001,()=>{
  console.log("socket server listening on port 3001")
})