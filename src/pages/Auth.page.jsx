import { Container, Grid, GridItem, useBreakpointValue } from '@chakra-ui/react';
import Header from '../components/header/Header';
import Login from '../components/auth/Login';
export default function AuthPage() {
  const containerWidth = useBreakpointValue({
    lg: '70%',
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
      w={'100vw'}
      h='100vh'
    >
      <GridItem area={'header'} borderBottom={'1px ridge'} bg={'gray.50'}>
        <Header />
      </GridItem>
      <GridItem area={'main'} borderRight={'1px ridge'} borderLeft={'1px ridge'}>
        <Container maxW={containerWidth} maxH={'50%'} pt={10}>
          <Login />
        </Container>
      </GridItem>
    </Grid>
  );
}
