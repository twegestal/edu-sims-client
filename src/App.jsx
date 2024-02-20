import { ChakraProvider } from "@chakra-ui/react";
import { Router } from "./Router";

export default function App() {
  return (
    <>
      <ChakraProvider>
        <Router />
      </ChakraProvider>
    </>
  );
}
