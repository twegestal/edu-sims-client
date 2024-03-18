import {
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import GenericAccordion from '../../../GenericAccordion';
import FeedbackMobile from '../../FeedbackMobile';
import { AddIcon, DeleteIcon, SearchIcon } from '@chakra-ui/icons';
import { IoIosCloseCircleOutline } from 'react-icons/io';

/**
 * This component sets up the treatment step used when performing a medical case.
 * The required properties are:
 * stepData - a JSON object containing specific data for this step
 * index - the index of this step in the order of the medical case's timeline
 * updateIsFinishedArray - a function implemented in the parent component that handles
 *                         which of the steps are displayed as finished and unlocked
 * incrementActiveStepIndex - a function implemented in the parent component that
 *                            that updates the index of the active step in the case
 */

export default function Treatment({
  stepData,
  index,
  updateIsFinishedArray,
  incrementActiveStepIndex,
}) {
  const [isFinished, setIsFinished] = useState(false);
  const [searchTerms, setSearchTerms] = useState({});
  const [chosenTreatments, setChosenTreatments] = useState([]);

  const finishStep = () => {
    setIsFinished(true);
    updateIsFinishedArray(index);
    incrementActiveStepIndex();
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

            {isFinished === false && (
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
    <>
      <VStack spacing='5'>
        <Text align='left'>{stepData.prompt}</Text>

        {isFinished === false && (
          <>
            <Divider variant='edu' />
            <Heading size='sm'>Välj behandlingar från listan:</Heading>
            {setupAccordions()}
          </>
        )}

        {chosenTreatments.length > 0 && (
          <>
            <Divider variant='edu' />

            <Heading size='sm'>Tillagda behandlingar:</Heading>

            {getChosenTreatments()}
          </>
        )}

        <Divider variant='edu' />

        {isFinished ? (
          <>
            {evaluateAnswer() ? (
              <FeedbackMobile wasCorrect={true} feedbackToDisplay={stepData.feedback_correct} />
            ) : (
              <FeedbackMobile wasCorrect={false} feedbackToDisplay={stepData.feedback_incorrect} />
            )}
          </>
        ) : (
          <Button isDisabled={chosenTreatments.length === 0} width='100%' onClick={finishStep}>
            Klar med behandlingar
          </Button>
        )}
      </VStack>
    </>
  );
}
