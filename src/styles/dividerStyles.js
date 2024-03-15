import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

/**
 * Sets up custom styles for the Chakra Divider component
 */

const thick = defineStyle({
  borderWidth: '5px',
  borderStyle: 'solid',
  borderRadius: 10,
  borderColor: 'orange.300',
});
const brandPrimary = defineStyle({
  borderWidth: '3px',
  borderStyle: 'dashed',
  borderColor: 'orange.500',

  _dark: {
    borderColor: 'orange.300',
  },
});
const edu = defineStyle({
  borderWidth: '3px',
  borderStyle: 'solid',
  borderColor: 'gray.400',
  borderRadius: '2px',
});
const edu_not_finished = defineStyle({
  borderWidth: '5px',
  borderStyle: 'solid',
  borderColor: 'gray.300',
  borderRadius: '2px',

  _dark: {
    borderColor: 'gray.100',
  },
});
const edu_finished = defineStyle({
  borderWidth: '5px',
  borderStyle: 'solid',
  borderColor: '#3f8f47',
  borderRadius: '2px',

  _dark: {
    borderColor: '#41F500',
  },
});

export const dividerTheme = defineStyleConfig({
  variants: { thick, brandPrimary, edu, edu_finished, edu_not_finished },
});
