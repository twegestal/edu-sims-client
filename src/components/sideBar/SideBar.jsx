import { Button, Spacer, VStack } from '@chakra-ui/react';
import SortCase from './SortCase';

export default function SideBar() {
  return (
    <VStack align={'center'} h={'76vh'}>
      <SortCase />
      <Spacer />
      <Button colorScheme='telegram'>Slumpa fall</Button>
    </VStack>
  );
}
