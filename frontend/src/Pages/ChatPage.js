import { Box } from "@chakra-ui/react";
import { useState } from "react";
import ChatBox from "../Components/ChatBox";
import SideDrawer from "../Components/miscellenous/SideDrawer";
import { useChatState } from "../context/ChatProvider";
import MyChats from "../Components/MyChats";

const Chatpage = () => {
  const { user } = useChatState();

  return (
    <div style={{ width: "100%", color: "white" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        textColor="white"
        p="10px"
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default Chatpage;
