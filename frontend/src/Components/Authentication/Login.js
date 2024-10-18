import React from 'react' 
import { Button } from "@chakra-ui/react";
import { FormControl, FormLabel } from '@chakra-ui/react';
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import { useState } from "react"; 
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Login() {  
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();  
    const [show, setShow] = useState(false); 
    const navigate = useNavigate()
    const handleClick = () => setShow(!show);  


    const submitHandler=async()=>{
      try{
        const data =await axios.post('/api/user/login', {email, password})  
        localStorage.setItem('userInfo', JSON.stringify(data))
        navigate('/chat')

      } 
      catch(error){
        console.log(error.message)
      }
     

    }
    

    const handlechange=(e)=>{ 
      const {name, value}=e.target 
      if(name==='email'){  setEmail(e.target.value)} 
      if (name ==='password'){setPassword(e.target.value)}
      
    }
  return (
    <VStack spacing="10px">
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          value={email}
          type="email"
          placeholder="Enter Your Email Address"
          onChange={handlechange}
          name="email"
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            value={password}
            onChange={handlechange}
            type={show ? "text" : "password"}
            placeholder="Enter password" 
            name="password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        // isLoading={loading}
      >
        Login
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  )
}

export default Login