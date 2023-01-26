import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChatState } from "../../Context/MyProvider"
import { SideBar } from "../ChatCom/SideBar"
import { Contacts } from "../ChatCom/Contacts"
import { MainBox } from "../ChatCom/MainBox"

import { Box, Spacer, Flex } from "@chakra-ui/react";

const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const navigate = useNavigate()

  const { user } = ChatState()

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userDetails"))

    if (!data) {
      navigate("/login")
    }
  }, [])

  return (
    <div styles={{ width: "100%" }}>
      <SideBar />

      <Box display={"flex"}  w="100%" h="91.5vh" p="10px">


        <Contacts d="flex"  fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />

       

        <MainBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />


      </Box>

    </div>
  )
}

export default ChatPage