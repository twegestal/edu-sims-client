import { Card, CardBody, CardHeader, Heading } from '@chakra-ui/react';

export default function FeedbackDesktop({ wasCorrect, feedbackToDisplay }) {
  return (
    <Card variant={'edu_card'}>
      <CardHeader bgColor={wasCorrect ? 'success.bg' : 'fail.bg'}>
        <Heading size={'md'}>Feedback</Heading>
      </CardHeader>

      <CardBody textAlign={'left'}>{feedbackToDisplay}</CardBody>
    </Card>
  );
}
