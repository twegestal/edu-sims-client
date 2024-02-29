import { IconButton, useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

export const ColorMode = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <IconButton
      aria-label={'Color mode switch'}
      variant={'icon_button'}
      icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
      onClick={toggleColorMode}
    />
  );
};
