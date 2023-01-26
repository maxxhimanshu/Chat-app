import { Box } from "@chakra-ui/react";
// import "./styles.css";
import BoxMassages from "./BoxMassages";
import { ChatState } from "../../Context/MyProvider";

export const MainBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="grey"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <BoxMassages  fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

