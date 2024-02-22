import { Divider, HStack, VStack } from '@chakra-ui/react';
import { RiAccountCircleFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

export default function DrawerMenu() {
  return (
    <VStack>
      <Divider />
      <HStack align={'left'}>
        <RiAccountCircleFill size={'10%'} />
        <Link>Mitt konto</Link>
      </HStack>
      <Divider />
    </VStack>
  );
}
