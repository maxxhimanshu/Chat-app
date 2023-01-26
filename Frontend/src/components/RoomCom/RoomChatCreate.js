import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    FormControl,
    Input,
    useToast,
    Box,
} from "@chakra-ui/react";
import React, { useState } from 'react'
import { UserListItem } from "../UserCom/UserListItem";
import { UserBadgeItem } from "../UserCom/UserBadgeItem";


export const RoomChatCreate = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [roomName, setRoomName] = useState()
    const [selectedUsers, setSelectedUsers] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const toast=useToast()

function getAllUsers(){
    setLoading(true)
    fetch("/server/all/users", {

        method: 'get',
        headers: {
            Authorization: localStorage.getItem("token")
        }
    }).then((res) => {
        res.json().then((responseData) => {
            if(responseData){
                setAllUsers(responseData)
            }
            else alert(responseData.message)
           console.log(responseData,"jj")
            setLoading(false)
        })
    })
}
function handleSelect(userId){
    if(selectedUsers.includes(userId)){
        alert("user is adready added")
        return
    }
    setSelectedUsers([...selectedUsers,userId])


}
const removeAdded=function(delUser){
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
}
function handleSubmit(){
    let arr = JSON.stringify(selectedUsers.map((u) => u._id))
    console.log(selectedUsers,roomName)
    if (!roomName || !selectedUsers) {
       alert("enter all details")
        return;
    }
    fetch("/server/chat/room", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify({users:arr,name:roomName}),

    }).then(response => response.json().then(data => {
        if (data.status) {
            onClose();
            console.log("done creating")
            toast({
                title: "New Group Chat Created!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            // if (!contacts.find((c) => c._id === data._id)) setContacts([data, ...contacts])
        }
        else alert(data.message)

       
   
        window.location.reload();

    }))
    }




    return (
        <>
            <span onClick={onOpen}>{children}</span>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize="35px"
                        fontFamily="Work sans"
                        display="flex"
                        justifyContent="center"
                    > Create Room</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        display="flex" flexDir="column" alignItems="center"
                    >
                        <FormControl>
                            <Input
                                placeholder="Room Name"
                                mb={3}
                                onChange={(e) => setRoomName(e.target.value)}
                            /> 
                        </FormControl>
                        <FormControl>
                            <Input
                                placeholder="Only select from the List Below"
                                mb={1}
                                
                                onClick={(e) => getAllUsers()}
                            />
                        </FormControl>
                        {selectedUsers.map((u) => (
                            <UserBadgeItem display="Flex" key={u._id}
                            user={u}
                            handleFunction={()=>removeAdded(u)}
                            />
                            ))}

                            
                            {loading?<div>loading...</div>:allUsers.map(user=>(<UserListItem
                            key={user.id}
                            user={user}
                            handleFunction={()=>handleSelect(user)}
                            />))}
                        

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                            Create
                        </Button>
                        {/* <Button variant='ghost'>Secondary Action</Button> */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
