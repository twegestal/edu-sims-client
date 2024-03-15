import { extendTheme } from '@chakra-ui/react';
import { buttonTheme } from './buttonStyles';
import { accordionTheme } from './accordionStyles';
import { inputTheme } from './inputStyles';
import { dividerTheme } from './dividerStyles';
import { cardTheme } from './cardStyles';

let theme;
export default theme = extendTheme({
  colors: {
    brand: {
      bg: '#f2f2f2',
      text: '#fff',
      card: '#0A99FF',
      neutralButton: '#737373',
    },
    gu: {
      bg: '#004b89',
    },
    success: {
      bg: '#8BD49A',
    },
    fail: {
      bg: '#E05D65',
    },
  },
  styles: {
    global: {
      '*, *::before, *::after': {
        boxSizing: 'border-box',
      },
    },
  },
  components: {
    Button: buttonTheme,
    Accordion: accordionTheme,
    Input: inputTheme,
    Divider: dividerTheme,
    Card: cardTheme,
  },
});
