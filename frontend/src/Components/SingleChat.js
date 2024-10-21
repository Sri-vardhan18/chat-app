import { Box, IconButton, Text } from '@chakra-ui/react'; // Ensure correct imports
import { useChatState } from '../context/ChatProvider';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from '../config/ChatLogic';
import ProfileModel from './miscellenous/ProfileModel';
import UpdateGroupChatModal from './miscellenous/UpdateGroupChatModal';

function SingleChat({fetchAgain,  setFetchagain}) {  
  const { selectedChat, setSelectedChat, user } = useChatState(); 
  console.log(selectedChat, "selectedChat");

  return (
    <>
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
          > <IconButton
          display={{ base: "flex", md: "none" }}
          icon={<ArrowBackIcon />}
          onClick={() => setSelectedChat("")}
        /> 
        {!selectedChat.isGroupChat? (
            <>{getSender(user, selectedChat.users)} 
            <ProfileModel  user={getSenderFull(user, selectedChat.users)}/>
            </>
        ):(
            <>
            {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModal
                    // fetchMessages={fetchMessages}
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
          overflowY="hidden"> 
          {/* message here */}

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
