import {
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';
import GenericAccordion from '../GenericAccordion';

export default function Feedback({ wasCorrect, feedbackToDisplay }) {
  return (
    <GenericAccordion
      allowMultiple={true}
      variant={wasCorrect ? 'edu_feedback_correct' : 'edu_feedback_incorrect'}
      accordionItems={[
        {
          heading: 'Feedback',
          content: feedbackToDisplay,
        },
      ]}
    />
  );
}
