import { Grid, GridItem } from '@chakra-ui/react';
import Header from '../components/header/Header';
import CaseDisplay from '../components/case/CaseDisplay';
import CaseDisplayDesk from '../components/case/CaseDisplayDesk';
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
        base: `"header" "mainBase"`,
        lg: `"header header" "mainDesk"`,
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
      {/* <GridItem area={'mainBase'} borderRight={'1px ridge'} borderLeft={'1px ridge'}>
        <CaseDisplay />
      </GridItem> */}
      <GridItem area={'mainBase'} borderRight={'1px ridge'} borderLeft={'1px ridge'}>
        <CaseDisplayDesk/>
      </GridItem>
    </Grid>
  );
}
