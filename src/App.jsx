import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Router } from './Router';

const theme = extendTheme({
  styles: {
    global: {
      '*, *::before, *::after': {
        boxSizing: 'border-box',
      },
    },
  },
});

export default function App() {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Router />
      </ChakraProvider>
    </>
  );
}
