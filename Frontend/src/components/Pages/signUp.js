import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate} from "react-router-dom"

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);

  const [firstName,setFirstName] =useState('');
  const [lastName,setLastName]=useState('');
  const [email, setEmail] = useState('');
  const [password,setPassword]=useState('')
  const [result,setResult]=useState({status:false,message:""})
  const [loader,setLoader]=useState(false)
  const navigate=useNavigate()
function createUser(){
   setLoader(true)
  const data={firstName,lastName,email,password}

fetch("/server/create", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
}).then((response) =>
  response.json().then((responseData) => {
    console.log(responseData);
    setResult(responseData);
    setLoader(false)
    if (responseData.status) {
      navigate("/login")
    }
         
setTimeout(() => {
  setResult({ status: false, message: "" });
}, 8000);
  })
);




}

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            {" "}
            Sign up{" "}
          </Heading>

          <Text fontSize={"lg"} color={"gray.600"}>
            {" "}
            To connect with your loved ones✌️{" "}
          </Text>
        </Stack>

        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </FormControl>
              </Box>

              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                isLoading={loader}
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={() => {
                 
                  firstName && email && password
                    ? createUser()
                    : alert("Enter all details");
                }}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              {result.status ? (
                <Text
                  fontSize="30px"
                  as="b"
                  align={"center"}
                  color={"green.700"}
                >
                  {result.message}
                </Text>
              ) : (
                <Text fontSize="30px" as="b" align={"center"} color={"red.700"}>
                  {result.message}
                </Text>
              )}
              
            </Stack>
            <Stack pt={6}>
              <Text align={"center"} fontSize="20px" >
                Already a user?{" "}
                <Link href="/login" color={"blue.400"}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
