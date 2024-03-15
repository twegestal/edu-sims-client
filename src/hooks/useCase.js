//useCase
import { useState } from "react";
import { useApi } from "./useApi";


export const useCase = () => {
  const getAllCasesApi = useApi('getAllCases');
  const getCaseByIdApi = useApi('getCaseById');

  const [cases, setCases] = useState();
  const [caseById, setCaseById] = useState(); 

  const getAllCases = async () => {
    try {
      const response = await getAllCasesApi();
      if (response.status === 200) {
        setCases(response.data);
      }
    } catch (error) {
      console.error('Error fetching cases: ', error);
    }
  };
/*
add more paramaters to add more 
search params and add it to the object like this: 
{key1: vlaue1, key2: value2}
*/
  const getCaseById = async (caseId) => {

    const searchParams = new URLSearchParams(
      {caseId: caseId}
    );

    try {
      const response = await getCaseByIdApi({ searchParams: searchParams });
      if (response.status === 200) {
        setCaseById(response.data);
      }
    } catch (error) {
      console.error('Error fetching case by id: ', error);
    }
  };


  return {
    cases,
    getAllCases,
    caseById,
    getCaseById,
  };
}