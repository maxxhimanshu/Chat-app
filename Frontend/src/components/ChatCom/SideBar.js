import React, { useState } from 'react'
import { Spacer, Box, Tooltip, Button, Text, Menu, MenuButton, Flex, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Spinner } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks"

import { ChatIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { UserLoader } from './UserLoader';
import { UserListItem } from "../UserCom/UserListItem"
import { ChatState } from "../../Context/MyProvider"


export const SideBar = () => {
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(true);
  const [loadingChat, setLoadingChat] = useState()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef()
  const navigate = useNavigate()
  const { selectedChat, setSelectedChat, contacts, setContacts } = ChatState()

  const logout = function () {
    localStorage.removeItem("userDetails");
    localStorage.removeItem("token");
    navigate("/login")
  }

  const chatStarter = function (userId) {
    setLoadingChat(true)
 
    fetch("/server/chat", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify({userId})

    }).then(response => response.json().then(data => {
      if (data.status) {
        setSelectedChat(data);
        // if (!contacts.find((c) => c._id === data._id)) setContacts([data, ...contacts])
      }
      else alert(data.message)

      // console.log(data)
      setLoadingChat(false)
      onClose();
      window.location.reload();

    }))
  }




  const getUsers = function () {
    setLoading(true)
    fetch("/server/all/users", {

      method: 'get',
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then((res) => {
      res.json().then((responseData) => {
        setResult(responseData)
        console.log(responseData)
        setLoading(false)
      })
    })

  }

  return (
    <>
      <Box>
        <Flex>
          <Tooltip label="Add new Users for chat" placement="bottom-end">
            <Button ref={btnRef} colorScheme='teal' onClick={() => {
              onOpen()
              getUsers()
            }} mx={2} my={2} >  <ChatIcon />  <Text d={{ base: "none", md: "flex" }} px={4}  >
                Add
              </Text></Button  ></Tooltip>
          <Spacer />
          <Menu>
            <MenuButton as={Button} px={4} mx={2} my={2} border='2px'
              borderColor='green.500' onClick={logout}>Logout</MenuButton>
          </Menu>
        </Flex>
      </Box>

      <Drawer isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}  >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            Add to Chats
          </DrawerHeader>

          <DrawerBody>
            {loadingChat && <Spinner ml="auto" d="flex" />}
            {
              loading ? <UserLoader /> : result.map(user => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => chatStarter(user._id)}
                />

              ))



            }

          </DrawerBody>

        </DrawerContent>

      </Drawer>
    </>
  )
}
