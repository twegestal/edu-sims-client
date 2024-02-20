import { Button, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function HomePage() {
  const [serverResponse, setServerResponse] = useState("EDU-SIMS");

  const fetchData = async () => {
    try {
      console.log(process.env.API_BASE_URL);
      const res = await fetch(process.env.API_BASE_URL);
      const hello = await res.json();
      setServerResponse(hello);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Text>{serverResponse}</Text>
      <Button onClick={fetchData}>CLICK ME!</Button>
    </>
  );
}
