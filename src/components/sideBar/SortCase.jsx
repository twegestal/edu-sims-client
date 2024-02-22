import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from '@chakra-ui/react';

export default function SortCase() {
  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme='telegram'>
        Filtrera fall
      </MenuButton>
      <MenuList>
        <MenuOptionGroup title='Status' type={'checkbox'}>
          <MenuItemOption value='notStarted'>Ej påbörjade</MenuItemOption>
          <MenuItemOption value='started'>Påbörjade</MenuItemOption>
          <MenuItemOption value='finished'>Avslutade</MenuItemOption>
        </MenuOptionGroup>
        <MenuOptionGroup title='Medicinskt område' type={'checkbox'}>
          <MenuItemOption value='endocrine'>Endokrina sjukdomar</MenuItemOption>
          <MenuItemOption value='cardiology'>Kardiologi</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}
