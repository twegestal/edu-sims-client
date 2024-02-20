import { Button, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function HomePage() {
  const [count, setCount] = useState(0);
  return (
    <>
      <Text>{count}</Text>
      <Button onClick={() => setCount(count + 1)}>Click me!</Button>
    </>
  );
}
