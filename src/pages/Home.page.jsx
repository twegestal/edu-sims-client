import { Button, Center, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

export default function HomePage() {
  const [serverResponse, setServerResponse] = useState("");
  const url = import.meta.env.VITE_API_BASE_URL;

  const sayHello = async () => {
    try {
      const res = await fetch(url);
      const hello = await res.json();
      setServerResponse(hello);
    } catch (error) {
      console.error(error);
    }
  };

  const checkHealth = async () => {
    try {
      const res = await fetch(`${url}health`);
      const health = await res.json();
      setServerResponse(health);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Center w={"100vw"} h={"100vh"}>
      <VStack>
        <Text>{serverResponse}</Text>
        <Button onClick={sayHello}>Say hello!</Button>
        <Button onClick={checkHealth}>Server healthy?</Button>
      </VStack>
    </Center>
  );
}
