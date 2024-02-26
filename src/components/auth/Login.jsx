import {
  Button,
  Card,
  CardBody,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
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
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import stethoscope from '../../assets/images/svg/stethoscope.svg';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

/**
 * This components renders the login page and reroutes the user to the homepage on succesful login.
 */

export default function Login() {
  const [emailInput, setEmailInput] = useState();
  const [passwordInput, setPasswordInput] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const emailError = emailInput === '';
  const passwordError = passwordInput === '';

  const columns = useBreakpointValue({
    base: 1,
    lg: 2,
  });

  useEffect(() => {
    if (user) {
      return navigate('/');
    } else {
      //TODO: change this to use our custom error message toast
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    if (!emailError && !passwordError) {
      await login(emailInput, passwordInput);
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
              <Heading size={'md'}>Logga in</Heading>

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
              <FormControl isRequired isInvalid={passwordError}>
                <FormLabel>Lösenord</FormLabel>
                <InputGroup>
                  <Input
                    id='passwordInput'
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

              <Button placeSelf={'start'} onClick={handleLogin}>
                Logga in
              </Button>
            </VStack>
          </SimpleGrid>
        </CardBody>
      </Card>
    </>
  );
}
