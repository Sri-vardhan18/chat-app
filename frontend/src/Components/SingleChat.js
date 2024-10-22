import {
  Box,
  FormControl,
  IconButton,
  Input,
  position,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react"; // Ensure correct imports
import { useChatState } from "../context/ChatProvider";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../config/ChatLogic";
import ProfileModel from "./miscellenous/ProfileModel";
import UpdateGroupChatModal from "./miscellenous/UpdateGroupChatModal";
import { useEffect, useState } from "react";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";

function SingleChat({ fetchAgain, setFetchagain }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState(""); 
  const toast = useToast()

  const { selectedChat, setSelectedChat, user } = useChatState();
  console.log(selectedChat, "selectedChat");

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      try { 
        setLoading(true)
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post("/api/messages/sendingmsg", {
          content: newMessage,
          chatid: selectedChat._id,
        }, config); 
        console.log(data, "hello") 

        setMessages([...messages, data]) 
        setLoading(false) 
        setNewMessage('')
      } catch (error) {  
        toast({
          title: "Error Occured!",
          description: "Failed to Load the Messages",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });

      }
    }
  };  
  console.log(messages, "messangers")


  const fetchMessages=async()=>{
    if(!selectedChat) return  
    try{  
      setLoading(true)
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }; 
       const {data} = await axios.get(`/api/messages/${selectedChat._id}`, 
        config
       )  
      

       setMessages(data)  
       
       setLoading(false)


    }catch(error){ 
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

    }

  } 

useEffect(()=>{
  fetchMessages()
},[selectedChat])
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    < >
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            {" "}
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModel user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchMessages={fetchMessages}
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchagain}
                />
              </>
            )}
          </Text>
          <Box
            dsiplay="flex"
            flexDirection="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <> 
              <div className="messages"> 
                <ScrollableChat messages={messages} />
                </div> 
              
              </>
            )}

            <FormControl 
            style={{position:'fixed',bottom:'25px', right:'25px', width:'64%'}}
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              {/* {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )} */}
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box d="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
}

export default SingleChat;
