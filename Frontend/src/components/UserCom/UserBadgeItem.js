import { CloseIcon } from "@chakra-ui/icons";
import { Badge, Flex } from "@chakra-ui/react";

export const UserBadgeItem = ({ user, handleFunction }) => {
  return (
 
    <Badge
    
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorScheme="pink"
      cursor="pointer"
      onClick={handleFunction}
    >
      {user.firstName}
    
      <CloseIcon pl={1} />
    </Badge>

  );
};

 