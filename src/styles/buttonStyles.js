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

const step_icon = defineStyle({
  _hover: {
    shadow: 'xl',

    animation: 'bounce 0.5s ease-in-out',
    '@keyframes bounce': {
      '0%': { transform: 'translateY(0)' },
      '25%': { transform: 'translateY(-3px)' },
      '50%': { transform: 'translateY(2px)' },
      '75%': { transform: 'translateY(-3px)' },
      '100%': { transform: 'translateY(0)' },
    },
  },
});

const step_icon_active = defineStyle({
  /* borderX: '20px',
  borderY: '24px',
  borderStyle: 'solid',
  borderColor: 'orange', */

  animation: 'beat 1.8s infinite ease-in-out',
  '@keyframes beat': {
    '0%': { transform: 'scale(100%)' },
    '25%': { transform: 'scale(110%)' },
    '50%': { transform: 'scale(100%)' },
    '75%': { transform: 'scale(110%)' },
    '100%': { transform: 'scale(100%)' },
  },
  /* animation: 'heartbeat 1.3s infinite ease-in-out',
  '@keyframes heartbeat': {
    '0%': { transform: 'scale(100%)' },
    '25%': { transform: 'scale(110%)' },
    '50%': { transform: 'scale(100%)' },
    '75%': { transform: 'scale(110%)' },
    '100%': { transform: 'scale(100%)' },
  }, */
});

export const buttonTheme = defineStyleConfig({
  variants: { outline, brand, icon_button, step_icon, step_icon_active },
  defaultProps: {
    variant: 'brand',
  },
});
