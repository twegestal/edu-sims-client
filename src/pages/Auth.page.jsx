import { useState } from 'react';
import { Container, Grid, GridItem, Link, useBreakpointValue } from '@chakra-ui/react';
import Header from '../components/header/Header';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
export default function AuthPage() {
  const [register, setRegister] = useState(false);
  const containerWidth = useBreakpointValue({
    lg: '60%',
    base: '90%',
  });
  return (
    <Grid
      templateAreas={{
        base: `"header"
               "main"`,
        lg: `"header header"
             "main"`,
      }}
      gridTemplateRows={{
        base: '10%',
        lg: '7%',
      }}
      gridTemplateColumns={{
        base: '1fr',
        lg: '1fr',
      }}
      w={'100%'}
      h='100vh'
    >
      <GridItem area={'header'} borderBottom={'1px ridge'} bg={'gray.50'}>
        <Header />
      </GridItem>
      <GridItem area={'main'} borderRight={'1px ridge'} borderLeft={'1px ridge'}>
        <Container maxW={containerWidth} maxH={'50%'} pt={10} pb={10}>
          {register ? (
            <>
              <Register />
              <Link onClick={() => setRegister(false)} color={'blue.400'}>
                Klicka här för att logga in
              </Link>
            </>
          ) : (
            <>
              <Login />
              <Link onClick={() => setRegister(true)} color={'blue.400'}>
                Klicka här för att registrera ett nytt konto
              </Link>
            </>
          )}
        </Container>
      </GridItem>
    </Grid>
  );
}
