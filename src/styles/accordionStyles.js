import { accordionAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

/**
 * Sets up custom styles for the Chakra Accordion component
 */

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  accordionAnatomy.keys,
);

const baseStyle = definePartsStyle({
  container: {
    borderWidth: '2px',
    borderStyle: 'solid',
    borderRadius: 'md',
    borderColor: 'black',
    marginBottom: '1%',
    marginTop: '1%',
    backgroundColor: '#f2f2f2',

    _dark: {
      bgColor: 'gray.500',
      borderColor: 'gray.300',
    },
  },

  button: {
    borderRadius: 'base',
  },

  panel: {
    paddingLeft: '1%',
    paddingRight: '1%',
    paddingTop: '1%',
    paddingBottom: '1%',
  },

  icon: {
    color: 'black',
  },
});

const edu_feedback_correct = definePartsStyle({
  button: {
    bgColor: 'success.bg',

    _hover: {
      bgColor: 'success.bg',
    },

    _expanded: {
      bgColor: 'succes.bg',
    },

    _dark: {
      bgColor: '#6bb47a',
    },
  },
  panel: {
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '3%',
    paddingBottom: '3%',
  },

  icon: {
    _dark: {
      color: 'gray.200',
    },
  },
});

const edu_feedback_incorrect = definePartsStyle({
  button: {
    bgColor: 'fail.bg',

    _hover: {
      bgColor: 'fail.bg',
    },

    _expanded: {
      bgColor: 'fail.bg',
    },

    _dark: {
      bgColor: '#b03d45',
    },
  },
  panel: {
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '3%',
    paddingBottom: '3%',
  },

  icon: {
    _dark: {
      color: 'gray.200',
    },
  },
});

const edu_exam_type = definePartsStyle({
  button: {
    backgroundColor: '#002db5',
    color: 'white',

    _expanded: {
      backgroundColor: '#002db5',
      color: 'white',
    },

    _hover: {
      backgroundColor: '#002db5',
      color: 'white',
    },
  },

  icon: {
    color: 'white',
  },
});

const edu_exam_subtype = definePartsStyle({
  button: {
    backgroundColor: '#204dd5',
    color: 'white',

    _expanded: {
      backgroundColor: '#204dd5',
      color: 'white',
    },

    _hover: {
      backgroundColor: '#204dd5',
      color: 'white',
    },
  },

  icon: {
    color: 'white',
  },
});

const edu_treatment_type = definePartsStyle({
  button: {
    backgroundColor: '#52a5c8',
    color: 'gray.100',

    _expanded: {
      backgroundColor: '#52a5c8',
      color: 'gray.100',
    },

    _hover: {
      backgroundColor: '#52a5c8',
      color: 'gray.100',
    },
  },

  icon: {
    color: 'gray.100',
  },
});

const edu_treatment_subtype = definePartsStyle({
  button: {
    backgroundColor: '#72c5e8',
    color: 'gray.600',

    _expanded: {
      backgroundColor: '#72c5e8',
      color: 'gray.600',
    },

    _hover: {
      backgroundColor: '#72c5e8',
      color: 'gray.600',
    },
  },

  icon: {
    color: 'gray.600',
  },
});

export const accordionTheme = defineMultiStyleConfig({
  baseStyle,
  variants: {
    edu_exam_type,
    edu_exam_subtype,
    edu_treatment_type,
    edu_treatment_subtype,
    edu_feedback_correct,
    edu_feedback_incorrect,
  },
});
