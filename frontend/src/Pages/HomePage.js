import React, { useEffect } from 'react'  

import {Box, Container, Text, Tab,TabList,TabPanel,TabPanels,Tabs,} from '@chakra-ui/react'
import SignUp from '../Components/Authentication/SignUp'
import Login from '../Components/Authentication/Login'
import { useNavigate } from 'react-router-dom'

function HomePage() {   
  const navigate=useNavigate()

  useEffect(()=>{
    const user =localStorage.getItem('userInfo') 
    if(user){
      navigate('/chat')
    }
  })
  return (
    <Container maxW="xl" centerContent>
    <Box
      d="flex"
      justifyContent="center"
      p={3}
      bg="white"
      w="100%"
      m="40px 0 15px 0"
      borderRadius="lg"
      borderWidth="1px"
    >
      <Text fontSize="4xl" fontFamily="Work sans">
        Chat App
      </Text>
    </Box>
    <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
      <Tabs isFitted variant="soft-rounded">
        <TabList mb="1em">
          <Tab>Login</Tab>
          <Tab>Sign Up</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Login />
          </TabPanel>
          <TabPanel>
            <SignUp />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  </Container>
  )
}

export default HomePage