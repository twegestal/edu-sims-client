import { Button, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function HomePage() {
  const [serverResponse, setServerResponse] = useState("EDU-SIMS");

  const fetchData = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_API_BASE_URL);
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
