import { Grid, GridItem } from '@chakra-ui/react';
import Header from '../components/header/Header';
import CaseDisplay from '../components/case/CaseDisplay';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CasePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    if (!user) {
      return navigate('/auth');
    }
  }, [user, navigate]);

  return (
    <Grid
      templateAreas={{
        base: `"header" "main"`,
        lg: `"header header" "main"`,
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
      h={'100vh'}
    >
      <GridItem area={'header'} borderBottom={'1px ridge'} bg={'gray.50'}>
        <Header />
      </GridItem>
      <GridItem area={'main'} borderRight={'1px ridge'} borderLeft={'1px ridge'}>
        <CaseDisplay />
      </GridItem>
    </Grid>
  );
}
