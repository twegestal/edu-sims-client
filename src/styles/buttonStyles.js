import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const brand = defineStyle({
  border: '2px solid',
  borderColor: 'gray.400',
  borderRadius: 'md',
  bgColor: 'gray.100',
  px: '2%',
  py: '1%',

  _dark: {
    border: '2px solid',
    borderColor: 'gray.200',
    bgColor: 'gray.600',
    textColor: 'gray.200',
  },
});

const icon_button = defineStyle({
  border: '1px solid',
  borderColor: 'gray.400',
  borderRadius: 'md',
  bgColor: 'gray.100',
  px: '2%',
  py: '1%',

  _dark: {
    border: '2px solid',
    borderColor: 'gray.200',
    bgColor: 'gray.600',
    textColor: 'gray.200',
  },
});

const outline = defineStyle({
  border: '2px dashed',
  borderRadius: 0,
  fontWeight: 'semibold',
});

export const buttonTheme = defineStyleConfig({
  variants: { outline, brand, icon_button },
  defaultProps: {
    variant: 'brand',
  },
});
