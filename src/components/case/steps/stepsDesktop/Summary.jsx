import { HStack, Card, Text, Stack, Button, Divider, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function Summary({
  stepData,
  index,
  updateIsFinishedArray,
  incrementActiveStepIndex,
  isVisible,
}) {
  const navigate = useNavigate();


  //TODO:Fixa Så att när man avlustar så uppdateras attemptet
  const finishStep = () => {
    
  };


  return (
    isVisible && (
      <HStack width={'100%'} height={'100%'} paddingLeft={'1%'} paddingRight={'1%'}>
        <Card
          width={'30%'}
          variant={'edu_case'}
          padding={'1%'}
          height={'100%'}
          textAlign={'left'}
          align={'center'}
          overflowY={'scroll'}
          css={{
            '&::-webkit-scrollbar': {
              width: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#2acaca; ',
              borderRadius: '5px',
              height: '40px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#0aaaaa; ',
            },
          }} 

        >
          <Stack spacing={8} textAlign={'left'}>
            <Heading size={'md'} textAlign={'center'}>Ytterligare Information</Heading>
            <Text>{stepData.additional_info}</Text>
          </Stack>
        </Card>
        <Stack width={'40%'} height={'100%'} spacing={8}>
          <Card
            variant={'edu_card'}
            padding={'5%'}
            textAlign={'left'}
            align={'center'}
            height={'100%'}
            overflowY={'scroll'}
            scrollBehavior={'smooth'}
            css={{
              '&::-webkit-scrollbar': {
                width: '10px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#2acaca; ',
                borderRadius: '5px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#0aaaaa; ',
              },
            }}
          >
            <Stack spacing={8} textAlign={'left'}>
              <Heading size={'md'} textAlign={'center'}>Process</Heading>
              <Text>{stepData.process}</Text>
            </Stack>
          </Card>
          <Button onClick={() => navigate('/')}>Avsluta Fall</Button>
        </Stack>
        <Card
          width={'30%'}
          height={'100%'}
          textAlign={'center'}
          variant={'edu_case'}
          padding={'1%'}>
          <Stack spacing={8} textAlign={'left'}>
            <Heading size={'md'} textAlign={'center'}>Ytterligare Länkar</Heading>
            <Text>{stepData.additional_links}</Text>
            </Stack>
        </Card>
      </HStack>
    )
  );
}
