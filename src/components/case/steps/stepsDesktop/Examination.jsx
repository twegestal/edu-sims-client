import {
  HStack,
  Card,
  Text,
  Stack,
  Button,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Checkbox,
  Heading,
  VStack,
  Divider,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import GenericAccordion from '../../../GenericAccordion';
import FeedbackDesktop from '../../FeedbackDesktop';

export default function Examination({
  stepData,
  index,
  updateIsFinishedArray,
  incrementActiveStepIndex,
  updateFaultsArray,
  isVisible,
  incrementStepToView,
}) {
  const [loading, setLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [isDoneButtonDisabled, setIsDoneButtonDisabled] = useState(true);
  const [searchTerms, setSearchTerms] = useState({});
  const [performedExaminations, setPerformedExaminations] = useState([]);
  const [examinationsToRun, setExaminationsToRun] = useState([]);
  const [resultList, setResultList] = useState([]);
  const [displayFeedback, setDisplayFeedback] = useState(false);
  const [stepSpecificValues, setStepSpecificValues] = useState();

  useEffect(() => {
    if (!stepSpecificValues) {
      let tempStepSpecificValues = {};
      for (const examination of stepData.step_specific_values) {
        tempStepSpecificValues[examination.examination_id] = {
          value: examination.value,
          isNormal: examination.is_normal,
          userHasTested: false,
        };
      }
      setStepSpecificValues(tempStepSpecificValues);
      setLoading(false);
    }
  }, [stepSpecificValues]);

  const finishStep = () => {
    if (!isFinished) {
      updateIsFinishedArray(index);
      setDisplayFeedback(true);
      setIsDoneButtonDisabled(true);

      if (!evaluateAnswer()) {
        updateFaultsArray(index);
      }
    }
  };

  const moveToNextStep = () => {
    if (isFinished) {
      incrementStepToView();
    } else {
      incrementActiveStepIndex();
      setIsFinished(true);
    }
  };

  const setupAccordions = () => {
    return (
      <GenericAccordion
        allowMultiple={true}
        variant={'edu_exam_type'}
        accordionItems={Object.entries(stepData.examination_to_display).map(([type, subTypes]) => ({
          heading: type,
          content: (
            <>
              <GenericAccordion
                allowMultiple={true}
                variant={'edu_exam_subtype'}
                accordionItems={Object.entries(subTypes).map(([subType, examinations]) => ({
                  heading: subType,
                  content: (
                    <>
                      <InputGroup>
                        <InputLeftElement>
                          <SearchIcon />
                        </InputLeftElement>
                        <Input
                          placeholder='Sök...'
                          value={searchTerms[subType] ? searchTerms[subType] : ''}
                          variant='edu_input'
                          onChange={(e) =>
                            setSearchTerms((prevState) => {
                              const newState = { ...prevState };
                              newState[subType] = e.target.value;
                              return newState;
                            })
                          }
                        ></Input>
                        {searchTerms[subType] && (
                          <InputRightElement
                            onClick={(e) => {
                              setSearchTerms((prevState) => {
                                const newState = { ...prevState };
                                newState[subType] = '';
                                return newState;
                              });
                            }}
                          >
                            <IoIosCloseCircleOutline />
                          </InputRightElement>
                        )}
                      </InputGroup>
                      {examinations
                        .filter((examination) => {
                          return (
                            performedExaminations.filter((performedExamination) => {
                              return examination.id === performedExamination.id;
                            }).length === 0
                          );
                        })
                        .filter((examination) =>
                          searchTerms[subType]
                            ? examination.name
                                .toLowerCase()
                                .includes(searchTerms[subType].toLowerCase())
                            : true,
                        )
                        .map((examination) => (
                          <HStack
                            key={examination.id}
                            justifyContent='left'
                            paddingLeft='3%'
                            paddingTop='0.5%'
                            paddingBottom='0.5%'
                          >
                            <Checkbox
                              borderColor='black'
                              id={examination.id}
                              onChange={(e) =>
                                handleCheckBox(examination.id, e.target.checked, type, subType)
                              }
                            >
                              {examination.name}
                            </Checkbox>
                          </HStack>
                        ))}
                    </>
                  ),
                }))}
              />
            </>
          ),
        }))}
      />
    );
  };

  const runExaminations = () => {
    let tempResultList = [...resultList];
    for (const examination of examinationsToRun) {
      if (examination.id in stepSpecificValues) {
        setStepSpecificValues((prevState) => {
          const newState = { ...prevState };
          newState[examination.id].userHasTested = true;
          return newState;
        });

        const newResult = {
          name: examination.name,
          value: stepSpecificValues[examination.id].value,
          isNormal: stepSpecificValues[examination.id].isNormal,
          maxValue: examination.max_value,
          minValue: examination.min_value,
          unit: examination.unit,
        };
        tempResultList.push(newResult);
      } else {
        if (examination.is_randomizable) {
          const newResult = {
            name: examination.name,
            value: randomizeNormalValue(examination),
            isNormal: true,
            maxValue: examination.max_value,
            minValue: examination.min_value,
            unit: examination.unit,
          };
          tempResultList.push(newResult);
        } else {
          const newResult = {
            name: examination.name,
            value: 'Normalvärde',
            isNormal: true,
            maxValue: null,
            minValue: null,
            unit: null,
          };
          tempResultList.push(newResult);
        }
      }
    }
    setPerformedExaminations((prevState) => {
      let newState = [...prevState];
      for (const examinationToRun of examinationsToRun) {
        newState.push(examinationToRun);
      }
      return newState;
    });
    setExaminationsToRun([]);
    setResultList(tempResultList);
    setIsDoneButtonDisabled(false);
  };

  const randomizeNormalValue = (examination) => {
    let randomizedNormalValue = 0;
    const maxValue = Number.parseFloat(examination.max_value.replace(',', '.'));
    const minValue = Number.parseFloat(examination.min_value.replace(',', '.'));

    randomizedNormalValue = (Math.random() * (maxValue - minValue) + minValue).toFixed(2);

    return randomizedNormalValue;
  };

  const handleCheckBox = (id, isChecked, type, subType) => {
    const examination = stepData.examination_to_display[type][subType].filter(
      (examination) => examination.id === id,
    )[0];
    if (isChecked) {
      setExaminationsToRun([...examinationsToRun, examination]);
    } else {
      setExaminationsToRun(examinationsToRun.filter((examination) => examination.id !== id));
    }
  };

  const setupResultList = () => {
    return (
      <TableContainer width='100%'>
        <Table variant='striped' size='sm'>
          <Thead>
            <Tr>
              <Th>Utredning</Th>
              <Th>Värde</Th>
              <Th>Gränsvärde</Th>
            </Tr>
          </Thead>

          <Tbody>
            {resultList.map((result, index) => (
              <Tr key={index} color={result.isNormal ? 'black' : 'fail.bg'}>
                <Td>{result.name}</Td>
                <Td>
                  {result.value} {result.unit}
                </Td>
                <Td>
                  {result.minValue} - {result.maxValue} {result.unit}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    );
  };

  const evaluateAnswer = () => {
    for (const [examinationId, examination] of Object.entries(stepSpecificValues)) {
      if (!examination.userHasTested) {
        return false;
      }
    }
    return true;
  };

  return (
    isVisible && (
      <HStack
        width={'100%'}
        height={'100%'}
        minHeight={'100%'}
        paddingLeft={'1%'}
        paddingRight={'1%'}
      >
        <Card width={'30%'} height={'100%'} minHeight={'100%'} variant={'edu_case'} padding={'1%'}>
          <VStack spacing={4}>
            {loading === false && displayFeedback === false && (
              <>
                <Heading size={'md'}>Välj utredningar från listan:</Heading>
                <Button isDisabled={examinationsToRun.length < 1} onClick={runExaminations}>
                  Genomför utredningar
                </Button>
                {setupAccordions()}
              </>
            )}
          </VStack>
        </Card>
        <Stack
          width={'40%'}
          height={'100%'}
          textAlign={'center'}
          paddingLeft={'1%'}
          paddingRight={'1%'}
        >
          <Heading size={'lg'} paddingBottom={2}>
            Utredning
          </Heading>
          <Card variant={'edu_card'} width={'100%'} padding={'5%'}>
            <VStack spacing={8}>
              <Text textAlign={'left'}>{stepData.prompt}</Text>

              <Divider variant={'edu'}></Divider>

              <Heading size={'md'}>Resultat:</Heading>
              {setupResultList()}

              {resultList.length > 0 && (
                <>
                  <Divider variant='edu' />
                  <Button isDisabled={isDoneButtonDisabled} onClick={finishStep}>
                    Klar med utredningar
                  </Button>
                </>
              )}
            </VStack>
          </Card>
          {displayFeedback && <Button onClick={() => moveToNextStep()}>Nästa steg</Button>}
        </Stack>
        <Card
          width={'30%'}
          height={'100%'}
          textAlign={'center'}
          variant={'edu_case'}
          paddingTop={2}
          paddingLeft={3}
          paddingRight={3}
        >
          {displayFeedback === true && (
            <>
              <FeedbackDesktop
                wasCorrect={evaluateAnswer()}
                feedbackToDisplay={
                  evaluateAnswer() ? stepData.feedback_correct : stepData.feedback_incorrect
                }
              />
            </>
          )}
        </Card>
      </HStack>
    )
  );
}
