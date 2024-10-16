import React from 'react' 
import { Button } from "@chakra-ui/react";
import { FormControl, FormLabel } from '@chakra-ui/react';
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import { useState } from "react";

function Login() {  
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();  
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show); 

    const submitHandler=()=>{

    }
    

    const handlechange=()=>{}
  return (
    <VStack spacing="10px">
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          value={email}
          type="email"
          placeholder="Enter Your Email Address"
          onChange={handlechange}
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