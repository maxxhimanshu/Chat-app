const chatModel=require("../Models/chatModel")
const userModel=require("../Models/userModel")
const messageModel = require("../Models/messagesModel")
const { model } = require("mongoose")
const { populate } = require("../Models/messagesModel")

const sendMessage=async function(req,res){
    try{
        const{description,chatId}=req.body
        if(!description|| !chatId){
            // console.log(description,chatId)
            return res.status(400).send({
                status:false,
                message:"Something messing ,Invalid data"
            })
        }
        
        
       let newMessages ={
            sender:req.user._id,
           body: description,
            chat:chatId
        };

        let messageData=await messageModel.create(newMessages)
        
        
       messageData= await messageData.populate(
            [{
                path:"sender",
                select:{firstName:1,lastName:1}
            },
            
            {
               path: "chat",
              select:{users:1}
           }
        ]
        );
        messageData =await userModel.populate(messageData,{
            path:"chat.users",
            select:"firstName lastName email"
        })
        let lastModified = await chatModel.findByIdAndUpdate(chatId,{lastMessage:messageData})
        // console.log(lastModified)
        return res.status(201).send({status:true,data:messageData})

    } catch (e) {
        return res.status(400).send({ status: false, message: e.message })
    }
}
const getMessages=async function(req,res){
    try {
        const message=await messageModel.find({chat:req.params.chatId}).populate("sender","firstName lastName email").populate("chat")
        res.status(200).send({status:true,data:message})
    } catch (e) {
        return res.status(400).send({ status: false, message: e.message })
    }
}

module.exports={sendMessage,getMessages}