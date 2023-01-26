const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const messageSchema = new mongoose.Schema(
  {
    sender:{
        type:ObjectId,
        ref:"Users"
    },
    body:{
        type:String,
        trim:true
    },
    chat:{
        type:ObjectId,
        ref:"Chat"
    }
    },
  { timestamp: true }
);
 module.exports = mongoose.model("Message", messageSchema);