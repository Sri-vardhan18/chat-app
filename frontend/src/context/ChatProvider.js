import {createContext,  useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'; 

const chatContext = createContext() 

const ChatProvider=({children})=>{ 
    const [user, setUser]= useState()  
     const [selectedChat, setSelectedChat] = useState(); 
     const [notification, setNotification] =useState([])
  const [chats, setChats] = useState([]);
    const navigate= useNavigate() 

    useEffect(()=>{ 
        const userinfo =JSON.parse(localStorage.getItem('userInfo') )
        setUser(userinfo?.data) 
        if(!userinfo){
            navigate('/')
        }
    },[])
    return <chatContext.Provider value ={{user, setUser, 
        selectedChat, setSelectedChat,
        chats, setChats,
        notification,setNotification
    }}> 
        {children}

    </chatContext.Provider>
}  
 



export const useChatState = () => {
    return useContext(chatContext);
};


export default ChatProvider