import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Router } from './Router';
import { AuthProvider } from './contexts/AuthProvider';
import theme from './styles/theme.js';

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
