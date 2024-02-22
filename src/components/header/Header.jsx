import { HStack, IconButton, Text } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import NavDrawer from '../drawer/NavDrawer';
import { ColorMode } from '../colorMode/ColorMode';

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <>
      <HStack justifyContent={'space-between'} pl={'5%'} pr={'5%'} align={'center'} height={'100%'}>
        <Text fontWeight={'bold'}>EDU-SIMS</Text>
        <HStack spacing={'20%'}>
          <ColorMode />
          <IconButton
            variant={'outline'}
            size={'md'}
            icon={<HamburgerIcon />}
            onClick={() => setIsDrawerOpen(true)}
          />
        </HStack>
      </HStack>
      <NavDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}
