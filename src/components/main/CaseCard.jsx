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
  VStack,
} from '@chakra-ui/react';
import stethoscope from '../../assets/images/svg/stethoscope.svg';
import { useNavigate } from 'react-router-dom';

export default function CaseCard({ name, medicalFieldId }) {
  const navigate = useNavigate();

  const getColorScheme = (medicalField) => {
    switch (medicalField) {
      case '6ff9e368-1e44-46d1-8192-ac3069c34f20':
        return 'blue.50';
    }
  };

  return (
    <Card
      bg={getColorScheme(medicalFieldId)}
      minH={'185px'}
      minW={'255px'}
      maxW={'370'}
      borderWidth={1}
      borderColor={'gray.400'}
    >
      <CardBody>
        <HStack>
          <Image boxSize={'30%'} src={stethoscope} />
          <VStack>
            <Heading size={'md'} pl={4}>
              {name}👿
            </Heading>
          </VStack>
        </HStack>
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
            Öppna fall
          </Button>
          <Box flexShrink={1} minWidth={'30%'}>
            <Text>Avklarat</Text>
          </Box>
        </HStack>
      </CardFooter>
    </Card>
  );
}
