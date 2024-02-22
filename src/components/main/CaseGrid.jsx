import { SimpleGrid } from '@chakra-ui/react';
import CaseCard from './CaseCard';

export default function CaseGrid() {
  return (
    <>
      <SimpleGrid
        columns={[1, 2, 3, 4]}
        spacing={10}
        justifyItems='center'
        alignItems='center'
        pt={10}
        pl={5}
        pr={5}
      >
        {Array.from({ length: 16 }).map((_, index) => (
          <CaseCard key={index} />
        ))}
      </SimpleGrid>
    </>
  );
}
