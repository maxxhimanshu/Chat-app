const express=require('express');
const chatController = require('../controller/chatController');
const userController=require('../controller/userController');
const messageController=require("../controller/messageController")

const auth=require("../middleware/auth")
const router=express.Router();

// <----------------------USER Apis------------------------------------------------------------------------------------
router.post("/create",userController.register)
router.post("/login",userController.loginUser)
router.get("/all/users",auth.checker, userController.getUsers);


// -----------------------------------------------------------------------------------------------------------------------

// <--------------------Chats Apis------------------------------------------------------------------------------------
router.post("/chat", auth.checker,chatController.createChat )

router.get("/chat/all", auth.checker, chatController.AllChats)
router.post("/chat/room", auth.checker, chatController.createRoom)

router.put("/chat/add", auth.checker, chatController.addToRoom)
router.put("/chat/remove", auth.checker, chatController.removeFromRoom)


// -----------------------------------------------------------------------------------------------------------------------------------------
//__________________________________Message Apis_____________________________________________-_________-___________-___________-_____-_______-_

router.post("/messages/start", auth.checker, messageController.sendMessage)
router.get("/messages/get/:chatId", auth.checker, messageController.getMessages)




// ____________________________________________________________________________________________________________________________________________________

router.get("/chat/:id");

router.all("/**", function (req, res) {
  res.status(404).send({
    status: false,
    msg: "The api you request is not available",
  });
});


module.exports = router