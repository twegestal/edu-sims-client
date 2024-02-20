import { Text } from "@chakra-ui/react";
import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    console.log("hejejkuken");
  }, []);

  return (
    <>
      <Text>EDU-SIMS</Text>
    </>
  );
}
