import { Divider, HStack, Text, VStack } from '@chakra-ui/react';
import { RiAccountCircleFill } from 'react-icons/ri';

export default function DrawerMenu() {
  return (
    <VStack>
      <Divider />
      <HStack align={'left'}>
        <RiAccountCircleFill size={'10%'} />
        <Text>Mitt konto</Text>
      </HStack>
      <Divider />
    </VStack>
  );
}
