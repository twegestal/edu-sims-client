import { Button, Center, Flex, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

export default function HomePage() {
  const [serverResponse, setServerResponse] = useState("EDU-SIMS");

  const fetchData = async () => {
    try {
      const url = import.meta.env.VITE_API_BASE_URL;
      console.log("url", url);
      const res = await fetch(url);
      const hello = await res.json();
      setServerResponse(hello);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Center w={"100vw"} h={"100vh"}>
      <VStack>
        <Text>{serverResponse}</Text>
        <Button onClick={fetchData}>CLICK ME!</Button>
      </VStack>
    </Center>
  );
}
