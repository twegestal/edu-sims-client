import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Box,
  Button,
  Card,
  flexbox,
  VStack,
  HStack,
  Stack,
  Text
} from '@chakra-ui/react'
import { useCase } from "../../hooks/useCase";
import { useEffect, useState } from 'react';

import Introduction from './steps/Introduction';
import Examination from './steps/Examination';
import Diagnosis from './steps/Diagnosis';
import Treatment from './steps/Treatment';
import Summary from './steps/Summary';

export default function CaseDisplayDesk() {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(false);

  const moduleTypeTable = ['Introduktion', 'Utredning', 'Diagnos', 'Behandling', 'Sammanfattning'];
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [loaderIndex, setLoaderIndex] = useState(0);
  const [isFinishedArray, setIsFinishedArray] = useState(new Array(steps.length).fill(false));
  const [faultsArray, setFaultsArray] = useState(new Array(steps.length).fill(false));

  const {
    caseById, getCaseById
  } = useCase();

  const incrementActiveStepIndex = () => {
    setLoaderIndex(loaderIndex + 1);
  };
  const updateFaultsArray = (index) => {
    setFaultsArray((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
  };

  useEffect(() => {
    const caseId = localStorage.getItem("currentCase");
    if (!caseById) {
      retrieveCaseById(caseId);
    } else {
      setSteps(caseById.steps);
      localStorage.removeItem("currentCase");
      setLoading(true);
    }
  }, [caseById]);

  const updateIsFinishedArray = (index) => {
    setIsFinishedArray((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
  };

  const retrieveCaseById = async (id) => {
    await getCaseById(id);
  }

  const getModuleName = (moduleTypeIdentifier, index) => {
    if (!isFinishedArray[index] && index !== loaderIndex) {
      return "?";
    }
    return moduleTypeTable[moduleTypeIdentifier];
  };

  const moduleSwitch = (stepData, moduleTypeIdentifier, index) => {
    switch (moduleTypeIdentifier) {
      case 0: {
        return (
          <Introduction
            stepData={stepData}
            index={index}
            updateIsFinishedArray={updateIsFinishedArray}
            incrementActiveStepIndex={incrementActiveStepIndex}
            updateFaultsArray={updateFaultsArray}
          />
        );
      }
      case 1: {
        return (
          <Examination
            stepData={stepData}
            index={index}
            updateIsFinishedArray={updateIsFinishedArray}
            incrementActiveStepIndex={incrementActiveStepIndex}
            updateFaultsArray={updateFaultsArray}
          />
        );
      }
      case 2: {
        return (
          <Diagnosis
            stepData={stepData}
            index={index}
            updateIsFinishedArray={updateIsFinishedArray}
            incrementActiveStepIndex={incrementActiveStepIndex}
            updateFaultsArray={updateFaultsArray}
          />
        );
      }
      case 3: {
        return (
          <Treatment
            stepData={stepData}
            index={index}
            updateIsFinishedArray={updateIsFinishedArray}
            incrementActiveStepIndex={incrementActiveStepIndex}
            updateFaultsArray={updateFaultsArray}
          />
        );
      }
      case 4: {
        return (
          <Summary
            stepData={stepData}
            index={index}
            updateIsFinishedArray={updateIsFinishedArray}
            incrementActiveStepIndex={incrementActiveStepIndex}
            updateFaultsArray={updateFaultsArray}
          />
        );
      }
    }
  };

  return (

    <HStack width={'100%'} height={'100%'}>
      <Card width={'25%'} height={'100%'} textAlign={'center'}><Text>HÄR KOMMER DET FINNA GREJER</Text></Card>
      <Stack width={'75%'} height={'100%'}>
        {loading && (
          <>
            <Stepper index={activeStepIndex}>
              {steps.map((step, index) => (
                <Step key={index} onClick={() => {

                  if (isFinishedArray[index] || index === loaderIndex) {
                    setActiveStepIndex(index)
                  }
                }}>
                  <Card onClick={() => console.log(index)} >
                    <HStack>
                      <StepIndicator >

                        <StepStatus
                          complete={(isFinishedArray[index] && (
                            <StepIcon />
                          ))}
                          incomplete={<StepNumber />}
                          active={<StepNumber />}
                        />

                      </StepIndicator>

                      <Box flexShrink='0'>
                        <StepTitle>{getModuleName(step.module_type_identifier, index)}</StepTitle>
                        {/* <StepDescription>d</StepDescription> */}

                      </Box>
                    </HStack>
                  </Card>
                  <StepSeparator />
                </Step>
              ))}
            </Stepper>

            {/* <Button onClick={() => {

            setActiveStepIndex(activeStepIndex - 1);
          }}>
            pre me -
          </Button>
          <Button onClick={() => {
            updateIsFinishedArray(activeStepIndex);
            setActiveStepIndex(activeStepIndex + 1);
          }}>
            pre me
          </Button> */}
            <Stack marginLeft={20} marginRight={20} padding={3} borderWidth={0}>{moduleSwitch(steps[activeStepIndex].stepData, steps[activeStepIndex].module_type_identifier, activeStepIndex)}</Stack>
          </>
        )}
      </Stack>
      <Card width={'25%'} height={'100%'} textAlign={'center'}><Text>HÄR KOMMER DET FINNA GREJER</Text></Card>
    </HStack>
  )
}