import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Button,
} from '@chakra-ui/react';
import DrawerMenu from './DrawerMenu';
import { useUser } from '../../hooks/useUser';

export default function NavDrawer({ isOpen, onClose }) {
  const { logout } = useUser();
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement={'right'}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Username</DrawerHeader>
        <DrawerBody>
          <DrawerMenu />
        </DrawerBody>
        <DrawerFooter justifyContent={'center'}>
          <Button colorScheme='blue' onClick={logout}>
            Logga ut
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
