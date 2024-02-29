import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
  Image,
  HStack,
  Progress,
  Box,
} from '@chakra-ui/react';
import stethoscope from '../../assets/images/svg/stethoscope.svg';
import { useNavigate } from 'react-router-dom';

export default function CaseCard() {
  const navigate = useNavigate();
  return (
    <Card bgGradient={'linear(to-br, gray.50, whiteAlpha.50)'}>
      <CardBody>
        <Image boxSize={'30%'} src={stethoscope} />
        <Stack mt={6} spacing={3}>
          <Heading>Case name</Heading>
          <Text>Description?</Text>
        </Stack>
      </CardBody>
      <Divider color={'lightgray'} />
      <CardFooter>
        <HStack spacing={2} justifyContent={'space-between'} w={'full'}>
          <Button
            flexShrink={1}
            variant={'solid'}
            colorScheme='telegram'
            onClick={() => {
              return navigate('/case');
            }}
          >
            Spela fall
          </Button>
          <Box flexShrink={1} minWidth={'30%'}>
            <Text>Avklarat</Text>
            <Progress value={100} size={'sm'} colorScheme='green' />
          </Box>
        </HStack>
      </CardFooter>
    </Card>
  );
}
