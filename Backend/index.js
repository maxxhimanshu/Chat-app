const express = require("express");
const route = require("./routes/route");
const mongoose = require("mongoose");
// const cors=require("cors")

require("dotenv").config();

const app = express();

mongoose.set("strictQuery", true);
mongoose
  .connect(
   process.env.CLUSTER,
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("Mongoose Connected"))
  .catch((err) => console.log(err.message));

app.use(express.json());
// app.use(cors())
app.use("/server", route);

const server = app.listen(process.env.PORT , function () {
  console.log(`listening on port ${process.env.PORT }...`);
});
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('socket connected');
  socket.on("setup",(userData)=>{

    socket.join(userData._id)
    socket.emit("connected")
  }) ;

socket.on('join chat',(room)=>{ 
  socket.join(room)
  // console.log("user Joined Room : " ,room)

})
 
  socket.on("new Message",(newMessageRecieved)=>{
  var chat=newMessageRecieved.chat;
  if(!chat.users)return console.log("chat.users not defined ")

  chat.users.forEach(user=>{
    if(user._id==newMessageRecieved.sender._id)return 

    socket.in(user.id).emit("message recieved",newMessageRecieved)
  })

})

});