import { HStack, Stack, Divider, Image, IconButton, Button, Card } from '@chakra-ui/react';
import { useCase } from '../../hooks/useCase';
import { useEffect, useState, Fragment } from 'react';

import Introduction from './steps/stepsDesktop/Introduction';
import Examination from './steps/stepsDesktop/Examination';
import Diagnosis from './steps/stepsDesktop/Diagnosis';
import Treatment from './steps/stepsDesktop/Treatment';
import Summary from './steps/stepsDesktop/Summary';

import introIcon from '../../assets/images/png/IntroIcon.png';
import examIcon from '../../assets/images/png/ExamIcon.png';
import diagnosisIcon from '../../assets/images/png/DiagnosisIcon.png';
import treatmentIcon from '../../assets/images/png/TreatmentIcon.png';
import summaryIcon from '../../assets/images/png/SummaryIcon.png';
import questionMarkIcon from '../../assets/images/png/QuestionMarkIcon.png';

export default function CaseDisplayDesk() {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(false);

  const moduleTypeTable = ['Introduktion', 'Utredning', 'Diagnos', 'Behandling', 'Sammanfattning'];
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [stepToView, setStepToView] = useState(0);
  const [isFinishedArray, setIsFinishedArray] = useState([]);
  const [faultsArray, setFaultsArray] = useState(new Array(steps.length).fill(false));

  const { caseById, getCaseById } = useCase();

  useEffect(() => {
    if (steps) {
      setIsFinishedArray(new Array(steps.length).fill(false));
    }
  }, [steps]);

  const updateFaultsArray = (index) => {
    setFaultsArray((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
  };

  useEffect(() => {
    const caseId = localStorage.getItem('currentCase');
    if (!caseById) {
      retrieveCaseById(caseId);
    } else {
      setSteps(caseById.steps);
      //TODO: Kontrollera ifall detta ska byttas ut eller om det ska återuptas 
      /* localStorage.removeItem('currentCase'); */
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
  };

  const getModuleName = (moduleTypeIdentifier, index) => {
    if (!isFinishedArray[index] && index !== loaderIndex) {
      return '?';
    }
    return moduleTypeTable[moduleTypeIdentifier];
  };

  const incrementActiveStepIndex = () => {
    setActiveStepIndex(activeStepIndex + 1);
    setStepToView(stepToView + 1);
  };

  const moduleSwitch = (stepData, moduleTypeIdentifier, index) => {
    switch (moduleTypeIdentifier) {
      case 0: {
        return (
          <Introduction
            key={index}
            stepData={stepData}
            index={index}
            updateIsFinishedArray={updateIsFinishedArray}
            incrementActiveStepIndex={incrementActiveStepIndex}
            updateFaultsArray={updateFaultsArray}
            isVisible={index === stepToView}
            incrementStepToView={incrementStepToView}
          />
        );
      }
      case 1: {
        return (
          <Examination
            key={index}
            stepData={stepData}
            index={index}
            updateIsFinishedArray={updateIsFinishedArray}
            incrementActiveStepIndex={incrementActiveStepIndex}
            updateFaultsArray={updateFaultsArray}
            isVisible={index === stepToView}
            incrementStepToView={incrementStepToView}
          />
        );
      }

      case 2: {
        return (
          <Diagnosis
            key={index}
            stepData={stepData}
            index={index}
            updateIsFinishedArray={updateIsFinishedArray}
            incrementActiveStepIndex={incrementActiveStepIndex}
            updateFaultsArray={updateFaultsArray}
            isVisible={index === stepToView}
            incrementStepToView={incrementStepToView}
          />
        );
      }
      case 3: {
        return (
          <Treatment
            key={index}
            stepData={stepData}
            index={index}
            updateIsFinishedArray={updateIsFinishedArray}
            incrementActiveStepIndex={incrementActiveStepIndex}
            updateFaultsArray={updateFaultsArray}
            isVisible={index === stepToView}
            incrementStepToView={incrementStepToView}
          />
        );
      }
      case 4: {
        return (
          <Summary
            key={index}
            stepData={stepData}
            index={index}
            updateIsFinishedArray={updateIsFinishedArray}
            incrementActiveStepIndex={incrementActiveStepIndex}
            updateFaultsArray={updateFaultsArray}
            isVisible={index === stepToView}
            incrementStepToView={incrementStepToView}
          />
        );
      }
    }
  };
  const incrementStepToView = () => {
    console.log("körs");
    setStepToView(stepToView + 1);
  }

  const getImage = (moduleTypeIdentifier, index) => {
    if (!isFinishedArray[index] && index !== activeStepIndex) {
      return (
        <Image
          key={`image ${index}`}
          width='12%'
          src={questionMarkIcon}
          alt='Okänd'
          maxW='50px'
          maxH='50px'
          minW='40px'
          minH='40px'
        />
      );
    }
    switch (moduleTypeIdentifier) {
      case 0: {
        return (
          <IconButton
            onClick={() => setStepToView(index)}
            variant={index === stepToView ? 'step_icon_active' : 'step_icon'}
          >
            <Image
              key={`image ${index}`}
              width='12%'
              src={introIcon}
              alt='Introduktion'
              maxW='50px'
              maxH='50px'
              minW='40px'
              minH='40px'
            />
          </IconButton>
        );
      }
      case 1: {
        return (
          <IconButton
            onClick={() => setStepToView(index)}
            variant={index === stepToView ? 'step_icon_active' : 'step_icon'}
          >
            <Image
              key={`image ${index}`}
              width='12%'
              src={examIcon}
              alt='Utredning'
              maxW='50px'
              maxH='50px'
              minW='40px'
              minH='40px'
            />
          </IconButton>
        );
      }
      case 2: {
        return (
          <IconButton
            onClick={() => setStepToView(index)}
            variant={index === stepToView ? 'step_icon_active' : 'step_icon'}
          >
            <Image
              key={`image ${index}`}
              width='12%'
              src={diagnosisIcon}
              alt='Diagnos'
              maxW='50px'
              maxH='50px'
              minW='40px'
              minH='40px'
            />
          </IconButton>
        );
      }
      case 3: {
        return (
          <IconButton
            onClick={() => setStepToView(index)}
            variant={index === stepToView ? 'step_icon_active' : 'step_icon'}
          >
            <Image
              key={`image ${index}`}
              width='12%'
              src={treatmentIcon}
              alt='Behandling'
              maxW='50px'
              maxH='50px'
              minW='40px'
              minH='40px'
            />
          </IconButton>
        );
      }
      case 4: {
        return (
          <IconButton
            onClick={() => setStepToView(index)}
            variant={index === stepToView ? 'step_icon_active' : 'step_icon'}
          >
            <Image
              key={`image ${index}`}
              width='12%'
              src={summaryIcon}
              alt='Sammanfattning'
              maxW='50px'
              maxH='50px'
              minW='40px'
              minH='40px'
            />
          </IconButton>
        );
      }
    }
  };

  return (
    <>
      {loading && (
        <>
            <Card variant={'filled'} margin={'1%'} border={'2px'}>
          <HStack
            justify={'center'}
            marginLeft={'10%'}
            marginRight={'10%'}
            marginTop={'1%'}
            marginBottom={'1%'}
          >
              {steps.map((step, index) => (
                <Fragment key={`frag${index}`}>
                  {getImage(step.module_type_identifier, index)}
                  {steps.length - 1 !== index && (
                    <Divider
                      variant={isFinishedArray[index] ? 'edu_finished' : 'edu_not_finished'}
                      justifySelf={'flex-end'}
                      key={index}
                    ></Divider>
                  )}
                </Fragment>
              ))}
          </HStack>
            </Card>
          <Stack width={'100%'} height={'100vh'}>
            {steps.map((step, index) =>
              moduleSwitch(step.stepData, step.module_type_identifier, index),
            )}
          </Stack>
        </>
      )}
    </>
  );
}
