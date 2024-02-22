import { Grid, GridItem } from '@chakra-ui/react';
import Header from '../components/header/Header';
import CaseGrid from '../components/main/CaseGrid';
import SideBar from '../components/sideBar/SideBar';

export default function HomePage() {
  return (
    <Grid
      templateAreas={{
        base: `"header"
               "main"`,
        lg: `"header header"
             "nav main"`,
      }}
      gridTemplateRows={{
        base: '10% 1fr',
        lg: '10% 1fr',
      }}
      gridTemplateColumns={{
        base: '1fr',
        lg: '15% 1fr',
      }}
      w={'100vw'}
      h='100vh'
      gap='1'
      color='blackAlpha.700'
      fontWeight='bold'
    >
      <GridItem pl='2' area={'header'} borderBottom={'1px ridge'}>
        <Header />
      </GridItem>
      <GridItem
        display={{ base: 'none', lg: 'block' }}
        pl='2'
        area={'nav'}
        alignContent={'center'}
        borderRight={'1px ridge'}
      >
        <SideBar />
      </GridItem>
      <GridItem pl='2' area={'main'}>
        <CaseGrid />
      </GridItem>
    </Grid>
  );
}
