import GenericAccordion from '../GenericAccordion';

export default function FeedbackMobile({ wasCorrect, feedbackToDisplay }) {
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
