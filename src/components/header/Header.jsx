import { Avatar, Button, HStack, IconButton, Image, Text } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import stethoscope from '../../assets/images/svg/stethoscope.svg';
import { useState } from 'react';
import NavDrawer from '../drawer/NavDrawer';
import { ColorMode } from '../colorMode/ColorMode';

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <>
      <HStack justifyContent={'space-between'}>
        <Image boxSize={'5%'} src={stethoscope} />
        {/* <Text fontSize={'4xl'}>EDU-SIMS</Text> */}
        <HStack marginRight={'3%'} spacing={'20%'}>
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