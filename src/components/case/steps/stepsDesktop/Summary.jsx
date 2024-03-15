import { HStack, Card, Text, Stack, Button } from '@chakra-ui/react';

export default function Summary({
  stepData,
  index,
  updateIsFinishedArray,
  incrementActiveStepIndex,
  updateFaultsArray,
  isVisible,
}) {
  const finishStep = () => {
    updateIsFinishedArray(index);
    incrementActiveStepIndex(index);
  };
  return (
    isVisible && (
      <HStack width={'100%'} height={'100%'}>
        <Card width={'30%'} height={'100%'} textAlign={'center'}>
          <Text>SUMMARY</Text>
        </Card>
        <Stack width={'40%'} height={'100%'}>
          <Button onClick={() => finishStep()}>Klar</Button>
        </Stack>
        <Card width={'30%'} height={'100%'} textAlign={'center'}>
          <Text>SUMMARY</Text>
        </Card>
      </HStack>
    )
  );
}
