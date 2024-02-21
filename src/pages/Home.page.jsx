import { Grid } from '@chakra-ui/react';

export default function HomePage() {
  return (
    <Grid
      templateAreas={{
        base: `'header' 'main'`,
        lg: `'header header' 'sidebar main'`,
      }}
    ></Grid>
  );
}
