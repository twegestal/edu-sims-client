import { Button, SimpleGrid, useBreakpointValue } from '@chakra-ui/react';
import CaseCard from './CaseCard';
import { useCase } from '../../hooks/useCase';
import { useEffect, useState } from 'react';

export default function CaseGrid() {
  const {
    cases, getAllCases,
    caseById, getCaseById
  } = useCase();
  const [loading, setLoading] = useState(true);
  const gridSpacing = useBreakpointValue(
    {
      base: [1, 2, 3, 4],
      md: [1, 2, 3],
      lg: [1, 2, 3]
    }
  )

  useEffect(() => {
    if (!cases) {
      fetchCases();
    } else {
      setLoading(false);
    }
  }, [cases, loading]);

  const fetchCases = async () => {
    await getAllCases();
  };

  const showM = async (id) => {
    await getCaseById(id);
    console.log(caseById);
  }

  return (
    <>
      {!loading && (<SimpleGrid
        columns={gridSpacing}
        spacing={10}
        justifyItems='center'
        alignItems='center'
        pt={10}
        pl={5}
        pr={5}
      >
        {cases.map((currentCase) => (
          currentCase.published && (
            <CaseCard key={currentCase.id} name={currentCase.name} />
          )
        ))}
        <Button onClick={() => showM('73784318-185d-4f4a-8dc4-ee77a45afcd9')}>me</Button>
      </SimpleGrid>)}

    </>
  );
}
