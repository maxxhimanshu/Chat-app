import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  // Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function SimpleCard() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState({ status: false, message: "" });
  const navigate = useNavigate()

  function LoginUser() {
    const data = { email, password };
    fetch("/server/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) =>
      response.json().then((responseData) => {

        setResult({ status: responseData.status, message: responseData.message });
        if (responseData.status) {
          navigate("/chats")
          localStorage.setItem("userDetails", JSON.stringify(responseData.data))
          localStorage.setItem("token", responseData.token)
        }
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
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            To stay connected with the loved ones ❤️
            {/* <Link color={"blue.400"}>features</Link> */}
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                {/* <Checkbox>Remember me</Checkbox> */}
                {/* <Link color={"blue.400"}>Forgot password?</Link> */}
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={LoginUser}
              >
                Sign in
              </Button>

              <Stack pt={6}>
                <Text align={"center"} fontSize="20px" >
                  Create an Account{" "}
                  <Link href="/" color={"blue.400"}>
                    Sign Up
                  </Link>
                </Text>
              </Stack>

            </Stack>
            <Stack pt={6}>
              {result.status ? (
                <Text
                  fontSize="25px"
                  as="b"
                  align={"center"}
                  color={"green.700"}
                >
                  {result.message}
                </Text>
              ) : (
                <Text fontSize="25px" as="b" align={"center"} color={"red.700"}>
                  {result.message}
                </Text>
              )}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

