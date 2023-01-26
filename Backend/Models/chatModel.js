 const mongoose = require('mongoose');
 const ObjectId=mongoose.Schema.Types.ObjectId;

 const chatSchema = new mongoose.Schema({
    chatName:{
        type:String,
        trim:true
    },
    isRoom:{
        type:Boolean,
        default:false
    },
    users:[{
        type:ObjectId,
        ref:"Users"
    }],
    lastMessage:{
        type:ObjectId,
        ref:"Message"
    },
    roomAdmin:{
        type:ObjectId,
        ref:"Users"
    }
 },{timestamp:true})

 module.exports = mongoose.model("Chat", chatSchema);