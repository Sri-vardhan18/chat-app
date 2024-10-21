import { Box } from "@chakra-ui/react";
import { useChatState } from "../context/ChatProvider";
import SingleChat from "./SingleChat";

const Chatbox = ({ fetchAgain, setFetchagain }) => { 

    const {selectedChat} = useChatState
  return (
    <>
      <Box
        display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
        alignItems="center"
        flexDir="column"
        p={3}
        bg="white" 
         textColor="black"
        w={{ base: "100%", md: "68%" }}
        borderRadius="lg"
        borderWidth="1px"
      >
        
        <SingleChat fetchAgain={fetchAgain} setFetchagain={setFetchagain} />
      </Box>
    </>
  );
};

export default Chatbox;
