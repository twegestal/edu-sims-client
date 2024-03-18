import { HStack, Card, Text, Stack, Button, Heading, Divider, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import FeedbackDesktop from '../../FeedbackDesktop';

export default function Introduction({
  stepData,
  index,
  updateIsFinishedArray,
  incrementActiveStepIndex,
  updateFaultsArray,
  isVisible,
  incrementStepToView,
}) {
  const [isYesBtnDisabled, setIsYesBtnDisabled] = useState(false);
  const [isNoBtnDisabled, setIsNoBtnDisabled] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [IsCorrect, setIsCorrect] = useState();
  const [feedbackToDisplay, setFeedbackToDisplay] = useState();
  const [displyFeedback, setDisplyFeedback] = useState(false);

  const finishStep = (answer) => {
    if (!isFinished) {
      updateIsFinishedArray(index);
      if (answer !== stepData.continue_treatment) {
        updateFaultsArray(index);
        setIsCorrect(false);
        setFeedbackToDisplay(stepData.feedback_incorrect);
      } else {
        setIsCorrect(true);
        setFeedbackToDisplay(stepData.feedback_correct);
      }
      if (answer) {
        setIsNoBtnDisabled(true);
      } else {
        setIsYesBtnDisabled(true);
      }
      setDisplyFeedback(true);
    }
  };

  const nextBtn = () => {
    if (isFinished) {
      incrementStepToView();
    } else {
      incrementActiveStepIndex();
      setIsFinished(true);
    }
  };
  return (
    isVisible && (
      <HStack width={'100%'} height={'100%'} paddingLeft={'1%'} paddingRight={'1%'}>
        <Card width={'30%'} height={'100%'} textAlign={'center'} variant={'edu_case'} />

        <Stack
          width={'40%'}
          height={'100%'}
          textAlign={'Center'}
          paddingLeft={'1%'}
          paddingRight={'1%'}
        >
          <Heading size={'lg'} paddingBottom={2}>
            Introduktion
          </Heading>
          <Card /* border={'2px solid gray'} */ variant={'edu_card'} width={'100%'} padding={'5%'}>
            <VStack spacing={8}>
              <Heading size={'md'}>Patientmöte</Heading>
              <Text textAlign={'left'}>{stepData.description}</Text>
              <Divider variant={'edu'} />
              <Heading size={'md'}>Finns det anledning att utreda patienten vidare?</Heading>
              <HStack width={'100%'} spacing={8} justifyContent={'center'}>
                <Button
                  isDisabled={isYesBtnDisabled}
                  id={'yesBtn'}
                  width={'20%'}
                  onClick={() => finishStep(true)}
                >
                  Ja
                </Button>
                <Button
                  isDisabled={isNoBtnDisabled}
                  id={'noBtn'}
                  width={'20%'}
                  onClick={() => finishStep(false)}
                >
                  Nej
                </Button>
              </HStack>
            </VStack>
          </Card>
          {displyFeedback && <Button onClick={() => nextBtn()}>Nästa Steg</Button>}
        </Stack>

        <Card
          variant={'edu_case'}
          width={'30%'}
          height={'100%'}
          textAlign={'center'}
          paddingTop={2}
          paddingLeft={3}
          paddingRight={3}
        >
          {displyFeedback && (
            <FeedbackDesktop wasCorrect={IsCorrect} feedbackToDisplay={feedbackToDisplay} />
          )}
        </Card>
      </HStack>
    )
  );
}
