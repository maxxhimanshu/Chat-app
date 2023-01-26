import React, { useState, useEffect } from 'react'
import { ChatState } from "../../Context/MyProvider"
import { Box, Button, Text, Stack, Avatar, Flex } from "@chakra-ui/react"
import { AddIcon } from '@chakra-ui/icons'
import { UserLoader } from './UserLoader'
import { RoomChatCreate } from '../RoomCom/RoomChatCreate'
export const Contacts = ({ fetchAgain }) => {

  const { selectedChat, setSelectedChat, contacts, setContacts } = ChatState()

  const [loggedUser, setLoggedUser] = useState()
  const [loader,setLoader]=useState(false)

  const fetchChats = function () {
setLoader(true)
    fetch("/server/chat/all", {

      method: 'GET',
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then((res) => {
      res.json().then((responseData) => {

        if (responseData.status) {

          setContacts(responseData.data)
          setLoader(false)
          // console.log(contacts, "h ", responseData.data.length)

        }
        else alert(responseData.message)

      })
    })

  }

  const getSender = (loggedUser, users) => {
    // console.log(loggedUser._id)
    return users[0]._id === loggedUser._id ? users[1].firstName + " "+users[1].lastName : users[0].firstName + " " + users[0].lastName;
  };

  useEffect(() => {
    fetchChats()
    // console.log(contacts)
    setLoggedUser(JSON.parse(localStorage.getItem("userDetails")))
  }, [fetchAgain])

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="grey"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"

      >
        My Chats

        <RoomChatCreate>
        <Button
          display="flex"
          fontSize={{ base: "17px", md: "10px", lg: "17px" }}
          rightIcon={<AddIcon />}
        >
          Create Room
        </Button>
        </RoomChatCreate>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="auto"
      >
        {contacts&& !loader ? (
          <Stack overflowY="scroll">
            {contacts.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Flex>
                  <Avatar
                    mr={2}
                    size="sm"
                    cursor="pointer"
                    name={!chat.isRoom
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}

                  />
                  <Text>
                    {!chat.isRoom
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                </Flex>


                
              </Box>
            ))}
          </Stack>
        ) : (
          <UserLoader />
        )}
      </Box>
    </Box>
  )
}
