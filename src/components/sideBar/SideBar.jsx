import { Button, VStack } from '@chakra-ui/react';
import SortCase from './SortCase';

export default function SideBar() {
  return (
    <VStack align={'center'} h={'fit-content'} pt={4} pb={4} position={'sticky'} top={0}>
      <SortCase />
      <Button colorScheme='telegram'>Slumpa fall</Button>
    </VStack>
  );
}
