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
import { useNavigate } from 'react-router-dom';

export default function NavDrawer({ isOpen, onClose }) {
  const { logout } = useUser();
  const navigate = useNavigate();
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
          <Button
            colorScheme='blue'
            onClick={() => {
              logout();
              return navigate('/');
            }}
          >
            Logga ut
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
