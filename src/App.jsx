import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Router } from './Router';
import { AuthProvider } from './contexts/AuthProvider';

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
        <AuthProvider>
          <Router />
        </AuthProvider>
      </ChakraProvider>
    </>
  );
}
