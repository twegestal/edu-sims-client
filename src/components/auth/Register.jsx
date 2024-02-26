import {
  Button,
  Card,
  CardBody,
  FormControl,
  FormErrorMessage,
  FormHelperText,
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
  const [groupIdInput, setGroupIdInput] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const emailError = emailInput === '';
  const passwordError = passwordInput === '';
  const confirmPasswordError =
    confirmPasswordInput === '' || passwordInput !== confirmPasswordInput;
  const groupIdError = groupIdInput === '';

  const columns = useBreakpointValue({
    base: 1,
    lg: 2,
  });

  const passwordCriteria = {
    uppercase: /[A-Z]/.test(passwordInput),
    lowercase: passwordInput ? /[a-z]/.test(passwordInput) : false,
    number: /\d/.test(passwordInput),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(passwordInput),
    length: passwordInput?.length >= 8 && passwordInput?.length <= 12,
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
          <Text>Mellan 8 och 12 tecken</Text>
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
      console.log('user: ', user);
      return navigate('/');
    }
  }, [user, navigate]);

  const handleRegister = async () => {
    if (passwordInput !== confirmPasswordInput) {
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
      group_id: groupIdInput,
    });

    if (validationResult.success) {
      const response = await register(emailInput, passwordInput, groupIdInput);
      console.log('response', response);
      if (response !== 201) {
        toast({
          title: 'Fel vid registrering',
          description: response.data,
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
      }
    } else {
      let errorString = '';
      errorsToString(validationResult.errors).map((error) => (errorString += `${error}. \n`));
      //TODO: should we concatenate all errors into one toast or map out several toasts? the newline character does not work in the toast component.
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

            <VStack justifyContent={'center'} spacing={2}>
              <Heading size={'md'}>Registrera nytt konto</Heading>

              <FormControl isRequired isInvalid={emailError}>
                <FormLabel>Email</FormLabel>
                <Input
                  type='email'
                  placeholder='Email...'
                  autoComplete='off'
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                  }}
                />
                {emailError ? (
                  <FormErrorMessage>Emailfältet får inte vara tomt</FormErrorMessage>
                ) : (
                  <FormHelperText textColor={'white'}>
                    -
                  </FormHelperText> /* TODO: this is a messy workaround to keep components from moving when rendering error message */
                )}
              </FormControl>
              <Tooltip label='Grupp-id får du av din lärare'>
                <FormControl isRequired isInvalid={groupIdError}>
                  <FormLabel>Grupp-id</FormLabel>

                  <Input
                    placeholder='Fyll i grupp-id...'
                    autoComplete='off'
                    onChange={(e) => setGroupIdInput(e.target.value)}
                  />

                  {groupIdError ? (
                    <FormErrorMessage>Grupp-id får inte vara tomt</FormErrorMessage>
                  ) : (
                    <FormHelperText textColor={'white'}>-</FormHelperText>
                  )}
                </FormControl>
              </Tooltip>
              <FormControl isRequired isInvalid={passwordError}>
                <FormLabel>Lösenord</FormLabel>
                <InputGroup>
                  <Input
                    placeholder='Lösenord...'
                    autoComplete='off'
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e) => setPasswordInput(e.target.value)}
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
                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    </InputRightElement>
                  </Tooltip>
                </InputGroup>

                {passwordError ? (
                  <FormErrorMessage>Lösenordfältet får inte vara tomt</FormErrorMessage>
                ) : (
                  <FormHelperText textColor={'white'}>
                    -
                  </FormHelperText> /* TODO: this is a messy workaround to keep components from moving when rendering error message */
                )}
              </FormControl>
              <FormControl isRequired isInvalid={confirmPasswordError}>
                <FormLabel>Bekräfta lösenord</FormLabel>
                <InputGroup>
                  <Input
                    placeholder='Bekräfta lösenord...'
                    autoComplete='off'
                    type={showConfirmPassword ? 'text' : 'password'}
                    onChange={(e) => setConfirmPasswordInput(e.target.value)}
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
                        icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      />
                    </InputRightElement>
                  </Tooltip>
                </InputGroup>

                {confirmPasswordError ? (
                  <FormErrorMessage>Bekräfta lösenord får inte vara tomt</FormErrorMessage>
                ) : (
                  <FormHelperText textColor={'white'}>
                    -
                  </FormHelperText> /* TODO: this is a messy workaround to keep components from moving when rendering error message */
                )}
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
