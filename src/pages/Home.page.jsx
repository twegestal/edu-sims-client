import { Grid, GridItem } from '@chakra-ui/react';
import Header from '../components/header/Header';
import CaseGrid from '../components/main/CaseGrid';
import SideBar from '../components/sideBar/SideBar';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    if (!user) {
      return navigate('/auth');
    }
  }, [user, navigate]);

  return (
    <>
      {user && (
        <Grid
          templateAreas={{
            base: `"header"
               "main"`,
            lg: `"header header"
             "nav main"`,
          }}
          gridTemplateRows={{
            base: '10%',
            lg: '7%',
          }}
          gridTemplateColumns={{
            base: '1fr',
            lg: '15%',
          }}
          w={'100vw'}
          h='100vh'
        >
          <GridItem area={'header'} borderBottom={'1px ridge'} bg={'gray.50'}>
            <Header />
          </GridItem>
          <GridItem
            display={{ base: 'none', lg: 'block' }}
            area={'nav'}
            borderRight={'1px ridge'}
            borderBottom={'1px ridge'}
          >
            <SideBar />
          </GridItem>
          <GridItem area={'main'} borderRight={'1px ridge'}>
            <CaseGrid />
          </GridItem>
        </Grid>
      )}
    </>
  );
}
