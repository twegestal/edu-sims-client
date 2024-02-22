import { Button, HStack, Hide, SimpleGrid } from '@chakra-ui/react';
import SkeletonCard from './SkeletonCard';
import SortCase from '../sideBar/SortCase';

export default function CaseGrid() {
  return (
    <>
      <Hide above='md'>
        <HStack justifyContent={'space-between'} marginBottom={'10%'}>
          <SortCase />
          <Button colorScheme='telegram'>Slumpa fall</Button>
        </HStack>
      </Hide>
      <SimpleGrid columns={[1, 2, 3]} spacing={10} justifyItems='center' alignItems='center'>
        {Array.from({ length: 12 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </SimpleGrid>
    </>
  );
}
