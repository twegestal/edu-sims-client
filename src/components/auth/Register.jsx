import {
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Show,
  SimpleGrid,
  Tooltip,
  VStack,
  useBreakpointValue,
  Text,
  useToast,
} from '@chakra-ui/react';
import { CheckCircleIcon, NotAllowedIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import stethoscope from '../../assets/images/svg/stethoscope.svg';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { validateRegistration } from '../../utils/validators/userValidators';
import { errorsToString } from '../../utils/validators/validationUtils';

/**
 * This components renders the registration page and reroutes the user to the homepage on succesful registration.
 */

export default function Register() {
  const [emailInput, setEmailInput] = useState();
  const [passwordInput, setPasswordInput] = useState();
  const [confirmPasswordInput, setConfirmPasswordInput] = useState();
  const [registrationCodeInput, setRegistrationCodeInput] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [registrationCodeError, setRegistrationCodeError] = useState(false);
  const { register, user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const columns = useBreakpointValue({
    base: 1,
    lg: 2,
  });

  const passwordCriteria = {
    uppercase: /[A-Z]/.test(passwordInput),
    lowercase: passwordInput ? /[a-z]/.test(passwordInput) : false,
    number: /\d/.test(passwordInput),
    specialChar: /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(passwordInput),
    length: passwordInput?.length >= 8,
    match: passwordInput && passwordInput === confirmPasswordInput,
  };

  const CriteriaIcon = ({ meetsCriteria }) => {
    return meetsCriteria ? <CheckCircleIcon color={'green'} /> : <NotAllowedIcon color={'red'} />;
  };

  const passwordCriterias = () => {
    return (
      <VStack alignItems={'left'} placeSelf={'start'}>
        <Heading size={'sm'} placeSelf={'start'}>
          Lösenordskriterier:
        </Heading>
        <HStack>
          <CriteriaIcon meetsCriteria={passwordCriteria.length} />
          <Text>Minst 8 tecken</Text>
        </HStack>
        <HStack>
          <CriteriaIcon meetsCriteria={passwordCriteria.uppercase} />
          <Text>Minst en versal</Text>
        </HStack>
        <HStack>
          <CriteriaIcon meetsCriteria={passwordCriteria.lowercase} />
          <Text>Minst en gemen</Text>
        </HStack>
        <HStack>
          <CriteriaIcon meetsCriteria={passwordCriteria.number} />
          <Text>Minst en siffra</Text>
        </HStack>
        <HStack>
          <CriteriaIcon meetsCriteria={passwordCriteria.specialChar} />
          <Text>Minst ett specialtecken</Text>
        </HStack>
        <HStack>
          <CriteriaIcon meetsCriteria={passwordCriteria.match} />
          <Text>Lösenorden måste matcha</Text>
        </HStack>
      </VStack>
    );
  };

  useEffect(() => {
    if (user) {
      return navigate('/');
    }
  }, [user, navigate]);

  const handleRegister = async () => {
    if (passwordInput !== confirmPasswordInput) {
      setPasswordError(true);
      setConfirmPasswordError(true);
      toast({
        title: 'Fel vid registrering',
        description: 'Lösenorden måste matcha',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
    const validationResult = validateRegistration({
      email: emailInput,
      password: passwordInput,
      group_id: registrationCodeInput,
    });

    if (validationResult.success) {
      const response = await register(emailInput, passwordInput, registrationCodeInput);

      if (response.status !== 201) {
        toast({
          title: 'Fel vid registrering',
          description: await response.json(),
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
      } else {
        toast({
          title: 'Välkommen!',
          description: `Registrering av kontot ${response.data.email} lyckades.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
      }
    } else {
      validationResult.errors.map((error) => {
        if (error.path === 'password') {
          setPasswordError(true);
          setConfirmPasswordError(true);
        } else if (error.path === 'email') {
          setEmailError(true);
        } else if (error.path === 'group_id') {
          setRegistrationCodeError(true);
        }
      });
      let errorString = '';
      errorsToString(validationResult.errors).map((error) => (errorString += `${error}. \n`));
      toast({
        title: 'Fel vid registrering',
        description: errorString,
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <>
      <Card variant='elevated' textAlign={'center'}>
        <CardBody>
          <SimpleGrid columns={columns} spacingX={'5%'}>
            <Show above='lg'>
              <Image src={stethoscope} />
            </Show>

            <VStack justifyContent={'center'} spacing={5}>
              <Heading size={'md'}>Registrera nytt konto</Heading>

              <FormControl isRequired isInvalid={emailError}>
                <FormLabel>Email</FormLabel>
                <Input
                  type='email'
                  placeholder='Email...'
                  autoComplete='off'
                  onChange={(e) => {
                    setEmailError(false);
                    setEmailInput(e.target.value);
                  }}
                />
              </FormControl>
              <Tooltip label='Registreringskod får du av din lärare'>
                <FormControl isRequired isInvalid={registrationCodeError}>
                  <FormLabel>Registreringskod</FormLabel>

                  <Input
                    placeholder='Fyll i registreringskod...'
                    autoComplete='off'
                    onChange={(e) => {
                      setRegistrationCodeError(false);
                      setRegistrationCodeInput(e.target.value);
                    }}
                  />
                </FormControl>
              </Tooltip>
              <FormControl isRequired isInvalid={passwordError}>
                <FormLabel>Lösenord</FormLabel>
                <InputGroup>
                  <Input
                    placeholder='Lösenord...'
                    autoComplete='off'
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e) => {
                      setPasswordError(false);
                      setPasswordInput(e.target.value);
                    }}
                  />
                  <Tooltip
                    label={
                      showPassword
                        ? 'Klicka för att dölja lösenord'
                        : 'Klicka för att visa lösenord'
                    }
                  >
                    <InputRightElement>
                      <IconButton
                        tabIndex={-1}
                        variant={'icon_button'}
                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                      />
                    </InputRightElement>
                  </Tooltip>
                </InputGroup>
              </FormControl>
              <FormControl isRequired isInvalid={confirmPasswordError}>
                <FormLabel>Bekräfta lösenord</FormLabel>
                <InputGroup>
                  <Input
                    placeholder='Bekräfta lösenord...'
                    autoComplete='off'
                    type={showConfirmPassword ? 'text' : 'password'}
                    onChange={(e) => {
                      setConfirmPasswordError(false);
                      setConfirmPasswordInput(e.target.value);
                    }}
                  />
                  <Tooltip
                    label={
                      showConfirmPassword
                        ? 'Klicka för att dölja lösenord'
                        : 'Klicka för att visa lösenord'
                    }
                  >
                    <InputRightElement>
                      <IconButton
                        tabIndex={-1}
                        variant={'icon_button'}
                        icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      />
                    </InputRightElement>
                  </Tooltip>
                </InputGroup>
              </FormControl>
              {passwordCriterias()}

              <Button
                placeSelf={() =>
                  useBreakpointValue({
                    base: 'center',
                    lg: 'start',
                  })
                }
                onClick={handleRegister}
              >
                Registrera konto
              </Button>
            </VStack>
          </SimpleGrid>
        </CardBody>
      </Card>
    </>
  );
}
