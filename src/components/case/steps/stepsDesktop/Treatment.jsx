import {
  HStack,
  Box,
  Card,
  Text,
  Stack,
  Button,
  VStack,
  Heading,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Divider,
} from '@chakra-ui/react';
import { SearchIcon, AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useState } from 'react';
import GenericAccordion from '../../../GenericAccordion';
import FeedbackDesktop from '../../FeedbackDesktop';
export default function Treatment({
  stepData,
  index,
  updateIsFinishedArray,
  incrementActiveStepIndex,
  updateFaultsArray,
  isVisible,
  incrementStepToView,
}) {
  const [isFinished, setIsFinished] = useState(false);
  const [displayFeedback, setDisplayFeedback] = useState(false);
  const [searchTerms, setSearchTerms] = useState({});
  const [chosenTreatments, setChosenTreatments] = useState([]);

  const finishStep = () => {
    if (!isFinished) {
      updateIsFinishedArray(index);
      setDisplayFeedback(true);
    }

    if (!evaluateAnswer()) {
      updateFaultsArray(index);
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

  const evaluateAnswer = () => {
    return stepData.step_specific_treatments.every((treatment) => {
      for (const chosenTreatment of chosenTreatments) {
        if (treatment.treatment_id === chosenTreatment.id) {
          return true;
        }
        return false;
      }
    });
  };

  const setupAccordions = () => {
    return (
      <GenericAccordion
        allowMultiple={true}
        variant={'edu_treatment_type'}
        accordionItems={Object.entries(stepData.treatments_to_display).map(([type, subTypes]) => ({
          heading: type,
          content: (
            <>
              <GenericAccordion
                allowMultiple={true}
                variant={'edu_treatment_subtype'}
                accordionItems={Object.entries(subTypes).map(([subType, treatments]) => ({
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
                      {treatments
                        .filter((treatment) => {
                          return (
                            chosenTreatments.filter((chosenTreatment) => {
                              return treatment.id === chosenTreatment.id;
                            }).length === 0
                          );
                        })
                        .filter((treatment) =>
                          searchTerms[subType]
                            ? treatment.name
                                .toLowerCase()
                                .includes(searchTerms[subType].toLowerCase())
                            : true,
                        )
                        .map((treatment) => (
                          <HStack
                            key={treatment.id}
                            justifyContent='left'
                            paddingLeft='3%'
                            paddingTop='1%'
                            paddingBottom='1%'
                            onClick={() =>
                              setChosenTreatments((prevState) => {
                                let newState = [...prevState];
                                newState.push(treatment);
                                return newState;
                              })
                            }
                          >
                            <AddIcon />
                            <Text>{treatment.name}</Text>
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

  const getChosenTreatments = () => {
    return (
      <VStack alignItems='left' width='100%' paddingLeft='5%' paddingRight='5%'>
        {chosenTreatments.map((treatment) => (
          <HStack key={treatment.id} spacing='2%' width='100%' justifyContent='space-between'>
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
              <Text textAlign='left'>{treatment.name}</Text>
            </Box>

            {displayFeedback === false && (
              <Box
                border='1px solid'
                borderRadius='5'
                padding='1%'
                paddingLeft='2%'
                paddingRight='2%'
                bg='fail.bg'
                onClick={() =>
                  setChosenTreatments((prevState) => {
                    const newState = prevState.filter(
                      (chosenTreatment) => treatment.id !== chosenTreatment.id,
                    );
                    return newState;
                  })
                }
              >
                <DeleteIcon />
              </Box>
            )}
          </HStack>
        ))}
      </VStack>
    );
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
            {displayFeedback === false && (
              <>
                <Heading size={'md'}>Välj behandlingar från listan:</Heading>
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
          <Heading size={'lg'}>Behandling</Heading>
          <Card variant={'edu_card'} width={'100%'} padding={'5%'}>
            <VStack spacing={8}>
              <Text textAlign={'left'}>{stepData.prompt}</Text>

              <Divider variant={'edu'} />

              <Heading size={'md'}>Tillagda behandlingar:</Heading>
              {chosenTreatments.length > 0 ? (
                getChosenTreatments()
              ) : (
                <Text as={'i'}>Välj behandlingar från listan till vänster</Text>
              )}

              <Divider variant={'edu'} />

              {displayFeedback === false && (
                <Button isDisabled={chosenTreatments.length === 0} onClick={finishStep}>
                  Klar med behandlingar
                </Button>
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
