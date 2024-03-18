import { HStack, Card, Text, Stack, Button, Heading, Box, Divider, VStack } from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import SearchBar from '../../../SearchBar.jsx';
import { useState} from "react";
import FeedbackDesktop from '../../FeedbackDesktop.jsx';

export default function Diagnosis({
  stepData,
  index,
  updateIsFinishedArray,
  incrementActiveStepIndex,
  updateFaultsArray,
  isVisible,
  incrementStepToView,
}) {
  const [diagnosisName, setDiagnosisName] = useState();
  const [isCorrect, setIsCorrect] = useState();
  const [feedbackToDisplay, setFeedbackToDisplay] = useState();
  const [isFinished, setIsFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [diagnosisId, setDiagnosisId] = useState('');
  const [showDiagnosis, setShowDiagnosis] = useState(false);
  const [filteredList, setFilteredList] = useState([]);

  const finishStep = () => {
    if (!isFinished) {
      updateIsFinishedArray(index);
      if (diagnosisId === stepData.diagnosis_id) {
        setIsCorrect(true);
        setFeedbackToDisplay(stepData.feedback_correct);
      } else {
        setIsCorrect(false);
        updateFaultsArray();
        setFeedbackToDisplay(stepData.feedback_incorrect);
      }
      setShowFeedback(true);
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

  const search = (searchTerm) => {
    if (searchTerm) {
      setFilteredList((prevState) => {
        const newState = stepData.diagnosis_list.filter((diagnosis) =>
          diagnosis.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        return newState;
      });
    } else {
      setFilteredList([]);
    }
  };

  const getChoosenDiagnosisCard = () => {
    return (
      <Stack spacing={3}>
        <HStack>
          <Box
            border='1px solid'
            borderRadius='5'
            paddingTop='1%'
            paddingBottom='1%'
            paddingRight='2%'
            paddingLeft='2%'
            bg='brand.bg'
            width='87%'
          >
            <Text textAlign='left'>{diagnosisName}</Text>
          </Box>

          {showFeedback === false && (
            <Box
              border='1px solid'
              borderRadius='5'
              padding='1%'
              paddingLeft='2%'
              paddingRight='2%'
              bg='fail.bg'
              onClick={() => {
                setDiagnosisId();
                setShowDiagnosis(false)
              }}
            >
              <DeleteIcon />
            </Box>
          )}
        </HStack>
      </Stack>
    );
  };


  return (
    isVisible && (
      <HStack width={'100%'} height={'100%'} paddingLeft={'1%'} paddingRight={'1%'}>
        <Card width={'30%'} height={'100%'} textAlign={'center'} variant={'edu_case'} padding={'1%'} >

          <Heading size={'sm'}>Vald Diagnos</Heading>
          {showDiagnosis &&
            (
              <Stack width={'100%'} margin={'1%'}>{getChoosenDiagnosisCard()}</Stack>
            )}

        </Card>
        <Stack width={'40%'} height={'100%'}>
          <Card variant={'edu_card'} padding={'5%'} textAlign={'center'} align={'center'}>
            <VStack spacing={2} width={'80%'}>
              <Text>{stepData.prompt}</Text>
              <Divider margin={'3%'} variant={'edu'} />
              {!diagnosisId ? (
                <>
                  <SearchBar onSearch={search} />

                  {filteredList.map((diagnosis) => (
                    <Card
                      key={diagnosis.id}
                      padding={'10px'}
                      border='2px'
                      width={'100%'}
                      onClick={() => {
                        setDiagnosisId(diagnosis.id);
                        setShowDiagnosis(true)
                        setFilteredList([]);
                        setDiagnosisName(diagnosis.name);
                      }}
                    >
                      <HStack>
                        <AddIcon></AddIcon>
                        <Text textAlign={'left'}>{diagnosis.name}</Text>
                      </HStack>
                    </Card>
                  ))}
                </>
              ) : (
                <>
                  {showFeedback ? (<Button onClick={() => nextBtn()}>Nästa Steg</Button>) : (<Button onClick={() => finishStep()}>Ställ Diagnos</Button>)}
                </>
              )}

            </VStack>
          </Card>
        </Stack>
        <Card width={'30%'} height={'100%'} textAlign={'center'} variant={'edu_case'} padding={'3%'}>
          {showFeedback && (
            <FeedbackDesktop
              wasCorrect={isCorrect}
              feedbackToDisplay={feedbackToDisplay}
            />
          )}
        </Card>
      </HStack>
    )
  );
}
