import { useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Collapse,
  HStack,
  Text,
  VStack,
  Icon,
  Tooltip,
  Image,
} from '@chakra-ui/react';
import { LockIcon, WarningIcon } from '@chakra-ui/icons';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useEffect } from 'react';
import { useCase } from '../../hooks/useCase';

import Introduction from './steps/stepsMobile/Introduction';
import Examination from './steps/stepsMobile/Examination';
import Diagnosis from './steps/stepsMobile/Diagnosis';
import Treatment from './steps/stepsMobile/Treatment';
import Summary from './steps/stepsMobile/Summary';

import introIcon from '../../assets/images/png/IntroIcon.png';
import examIcon from '../../assets/images/png/ExamIcon.png';
import diagnosisIcon from '../../assets/images/png/DiagnosisIcon.png';
import treatmentIcon from '../../assets/images/png/TreatmentIcon.png';
import summaryIcon from '../../assets/images/png/SummaryIcon.png';
import questionMarkIcon from '../../assets/images/png/QuestionMarkIcon.png';

export default function CaseDisplay() {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(false);

  const moduleTypeTable = ['Introduktion', 'Utredning', 'Diagnos', 'Behandling', 'Sammanfattning'];
  const [openCardIndex, setOpenCardIndex] = useState(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isFinishedArray, setIsFinishedArray] = useState(new Array(steps.length).fill(false));
  const [faultsArray, setFaultsArray] = useState(new Array(steps.length).fill(false));

  const { caseById, getCaseById } = useCase();

  useEffect(() => {
    const caseId = localStorage.getItem('currentCase');
    if (!caseById) {
      retrieveCaseById(caseId);
    } else {
      setSteps(caseById.steps);
      /* localStorage.removeItem('currentCase'); */
      setLoading(true);
    }
  }, [caseById]);

  const retrieveCaseById = async (id) => {
    await getCaseById(id);
  };

  const CircleIcon = (props) => (
    <Icon viewBox='0 0 200 200' boxSize='4' {...props}>
      <path fill='currentColor' d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0' />
    </Icon>
  );

  const onToggle = (index) => {
    setOpenCardIndex((prevIndex) => {
      if (prevIndex === index) {
        return;
      } else {
        return index;
      }
    });
  };

  const incrementActiveStepIndex = () => {
    setActiveStepIndex(activeStepIndex + 1);
  };

  const updateIsFinishedArray = (index) => {
    setIsFinishedArray((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
  };

  const updateFaultsArray = (index) => {
    setFaultsArray((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
  };

  const getControlIcon = (index) => {
    if (index === activeStepIndex || isFinishedArray[index]) {
      return index === openCardIndex ? (
        <FaChevronUp onClick={() => onToggle(index)} />
      ) : (
        <FaChevronDown onClick={() => onToggle(index)} />
      );
    } else {
      return <LockIcon />;
    }
  };

  const getProgressIcon = (index) => {
    if (index === activeStepIndex) {
      return <CircleIcon color='yellow.500' />;
    }
    return isFinishedArray[index] ? (
      <CircleIcon color='green.500' />
    ) : (
      <CircleIcon color='red.500' />
    );
  };

  const getFaultsIcon = (index) => {
    if (faultsArray[index]) {
      return (
        <Tooltip label='Det fanns ett fel i svaret på detta steg' fontSize='md'>
          <WarningIcon />
        </Tooltip>
      );
    }
    return null;
  };

  const getImage = (moduleTypeIdentifier, index) => {
    if (!isFinishedArray[index] && index !== activeStepIndex) {
      return (
        <Image
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
          <Image
            width='12%'
            src={introIcon}
            alt='Introduktion'
            maxW='50px'
            maxH='50px'
            minW='40px'
            minH='40px'
          />
        );
      }
      case 1: {
        return (
          <Image
            width='12%'
            src={examIcon}
            alt='Utredning'
            maxW='50px'
            maxH='50px'
            minW='40px'
            minH='40px'
          />
        );
      }
      case 2: {
        return (
          <Image
            width='12%'
            src={diagnosisIcon}
            alt='Diagnos'
            maxW='50px'
            maxH='50px'
            minW='40px'
            minH='40px'
          />
        );
      }
      case 3: {
        return (
          <Image
            width='12%'
            src={treatmentIcon}
            alt='Behandling'
            maxW='50px'
            maxH='50px'
            minW='40px'
            minH='40px'
          />
        );
      }
      case 4: {
        return (
          <Image
            width='12%'
            src={summaryIcon}
            alt='Sammanfattning'
            maxW='50px'
            maxH='50px'
            minW='40px'
            minH='40px'
          />
        );
      }
    }
  };

  const getModuleName = (moduleTypeIdentifier, index) => {
    if (!isFinishedArray[index] && index !== activeStepIndex) {
      return null;
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
    <>
      {loading && (
        <VStack margin={'1'} alignItems={'stretch'} spacing={'1'}>
          {steps.map((step, index) => (
            <Card key={index}>
              <CardHeader margin={'-0.75'}>
                <HStack justify={'space-between'}>
                  <HStack spacing={'8'}>
                    {getImage(step.module_type_identifier, index)}
                    <Text>{getModuleName(step.module_type_identifier, index)}</Text>
                  </HStack>
                  <HStack spacing={'8'}>{getControlIcon(index)}</HStack>
                </HStack>
              </CardHeader>
              <Collapse in={openCardIndex === index}>
                <CardBody>
                  {moduleSwitch(step.stepData, step.module_type_identifier, index)}
                </CardBody>
              </Collapse>
            </Card>
          ))}
        </VStack>
      )}
    </>
  );
}
