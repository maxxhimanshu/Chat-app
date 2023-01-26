import React from 'react'

import { Avatar } from "@chakra-ui/avatar";
import { Box, Flex, Spacer, Text } from "@chakra-ui/layout";
export const UserListItem = ({user,handleFunction}) => {
  return (

        <Box
          onClick={handleFunction}
          cursor="pointer"
          bg="#b0dbc2d6"
          _hover={{
              background: "#73ad8bd6",
              color: "white",
          }}
          w="100%"

          alignItems="center"
          color="black"
          px={3}
          py={2}
          mb={2}
          borderRadius="lg"
      >
          <Flex>
          <Avatar
              mr={2}
              size="sm"
              cursor="pointer"
              name={user.firstName +" "+ user.lastName} 
      
          />
  
          <Box>
              <Text>{user.firstName +" "+ user.lastName}</Text>
              <Text fontSize="xs">
                  <b>Email : </b>
                  {user.email}
              </Text>
          </Box>
      </Flex>
      </Box>
    
  )
}
