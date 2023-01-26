import { Box, Button, FormControl, IconButton, Input, Spinner, Text } from '@chakra-ui/react'
import { ArrowBackIcon, ArrowRightIcon } from "@chakra-ui/icons"
import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/MyProvider'
import { SingleMessagesShow } from './SingleMessagesShow'
import io from "socket.io-client"

const ENDPOINT ="http://localhost:5000"
var socket , selectedChatCompare




const BoxMassages = ({ fetchAgain, setFetchAgain }) => {
    const { user, selectedChat, setSelectedChat } = ChatState()
    const [messages, setMessages] = useState([])
    const [singleMsg,setSingleMsg]=useState("")
    const [loader, setloader] = useState(false)
    const [sendLoad,setSendLoad]=useState(false)
    const [connected,setConnected] = useState(false)// socket

    useEffect(() => {

        socket = io(ENDPOINT)
        socket.emit("setup", user)
        socket.on("connection", () => setConnected(true))

    }, []) 



const getMessages = function () {
        setloader(true)
        fetch(`/server/messages/get/${selectedChat._id}`, {

            method: 'get',
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then((res) => {
            res.json().then((responseData) => {
                if (responseData.status) {
                setMessages(responseData.data)

                setloader(false)
                
                    socket.emit("join chat",selectedChat._id)

                }
                else alert("some error occoured ", responseData.message)
            })
        })

    }


useEffect(()=>{

if(selectedChat)getMessages()

}, [selectedChat]) 

function sendMessage() {
        const Msgdata = { description:singleMsg,chatId:selectedChat._id}
        setSingleMsg("")
        setSendLoad(true)
        fetch("/server/messages/start", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify(Msgdata)

        }).then(response => response.json().then(data => {
            if (data.status) {
                setMessages([...messages,data.data]);
                // console.log("success")
               socket.emit("new Message",data.data)
            }
            else alert("some error occoured ",data.message)
     
            setSendLoad(false)

        }))
    }


useEffect(()=>{
    socket.on("message recieved",(newMessageRecieved)=>{
        // console.log(newMessageRecieved)
        if(!selectedChatCompare||selectedChatCompare._id!==newMessageRecieved.chat._id){}

        setMessages([...messages,newMessageRecieved])
       
    });
})


    return (
        <>
            {selectedChat ? (
                <>
                    <Text fontSize={{ base: "28px", md: "30px" }}
                        backgroundColor="whiteAlpha.100"

                        // borderRadius={"3px"}
                        // border="2px"
                        // margin="2px"
                        // borderColor="white"
                        color={'white'}
                        pb={3}
                        px={2}
                        w="100%"
                        display="flex"
                        justifyContent={{ base: "space-between" }}
                        alignItems="center">
                        <IconButton
                            display={{ base: "flex", md: "none" }}
                            icon={<ArrowBackIcon color='black' />}
                            onClick={() => setSelectedChat("")}
                        />
                        {selectedChat.isRoom ? <>{selectedChat.chatName}</> : <>{user._id != selectedChat.users[0]._id ? (selectedChat.users[0].firstName + " " + selectedChat.users[0].lastName) : (selectedChat.users[1].firstName + " " + selectedChat.users[1].lastName)}</>


                        }
                    </Text>

                    <Box
                        display={"flex"}
                        flexDir="column"
                        justifyContent={"flex-end"}
                        p={3}
                        bg="whiteAlpha.800"
                        w={"100%"}
                        h={"100%"}
                        borderRadius="lg"
                        overflow={"hidden"}
                    >
                        { 
                            (<>{
                                loader ? (<Spinner color='teal' size="xl" w="60px" h="60px" alignSelf="center" margin="auto" />
                                ) : <Box 
                                display={"flex"}
                                flexDirection="column"
                                overflowY={"auto"}
                                
                                >
                                    
                                    <SingleMessagesShow messages={messages}/>
                                </Box>

                            }
                                
                                <Box display={"flex"}>
                                        <FormControl margin="5px" onKeyDown={(e) =>{if(e.key == "Enter") sendMessage()} }>
                                            {sendLoad ? <Spinner color='teal' w="15px" h="15px" margin={"2px"} />:null}    
                                        <Input color='teal'
                                            placeholder='Click to type Message'
                                            _placeholder={{ color: 'inherit' }} border={"2px"} borderColor="blackAlpha.500" 
                                            
                                            onChange={(e)=>{setSingleMsg(e.target.value)}}
                                            value={singleMsg}
                                            />
                                            

                                    </FormControl>

                                    <Button onClick={sendMessage} border="1px" display={{ base: "none", md: "flex" }} margin="5px" color='teal' >Send</Button>
                                        <ArrowRightIcon onClick={sendMessage} margin={"7px"} boxSize={8} color='teal' display={{ md: "none", base: "flex" }} />
                                </Box>

                            </>)
                        }




                    </Box>





                </>
            ) : (
                <Box
                    display="flex" alignItems="center" justifyContent="center" h="100%">

                    <Text fontSize="28px" color={"white"}>
                        Click on a user to start chatting
                    </Text>
                </Box>

            )}

        </>

    )
}

export default BoxMassages