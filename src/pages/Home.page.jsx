import { Button, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function HomePage() {
  const [serverResponse, setServerResponse] = useState("EDU-SIMS");

  const fetchData = async () => {
    console.log("here?");
    try {
      const res = await fetch("/api");
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
