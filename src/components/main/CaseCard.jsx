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

const getColorScheme = (medicalField) =>{
  switch(medicalField){
    case 'endo': return 'blue.50';

  }
}

export default function CaseCard({name, medicalField}) {
  return (
    <Card bg={getColorScheme('endo')} minH={'185px'} minW={'255px'} maxW={'370'} borderWidth={1} borderColor={'gray.400'}>
      <CardBody>
        <HStack>
          <Image boxSize={'30%'} src={stethoscope} />
          <VStack>
            <Heading size={'md'} pl={4} >{name}👿</Heading>
            
          </VStack>
        </HStack>
      </CardBody>
      <Divider color={'lightgray'} />
      <CardFooter>
        <HStack spacing={2} justifyContent={'space-between'} w={'full'}>
          <Button flexShrink={1} variant={'solid'} colorScheme='telegram'>
            Bemöt Patient 
          </Button>
          <Box flexShrink={1} minWidth={'30%'}>
            <Text>Avklarat</Text>
          </Box>
        </HStack>
      </CardFooter>
    </Card>
  );
}
