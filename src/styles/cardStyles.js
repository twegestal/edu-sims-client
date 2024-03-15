import { cardAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  cardAnatomy.keys,
);

const edu_case = definePartsStyle({
  container: {
    borderColor: 'gray.400',
    borderWidth: '2px',
    bgColor: 'cyan.50',

    _dark: {
      bgColor: 'gray.600',
    },
  },
});

const edu_card = definePartsStyle({
  container: {
    borderColor: 'black',
    borderWidth: '4px',
    backgroundColor: '#206bA9',
  },
});

// export variants in the component theme
export const cardTheme = defineMultiStyleConfig({
  variants: {
    edu_case,
    edu_card,
  },
});

// now we can use the new funky variant
