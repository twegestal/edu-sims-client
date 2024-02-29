import { useState } from "react";
import { useApi } from "./useApi";


export const useCase = () =>{
    const getAllCasesApi = useApi('getAllCases');

    const [cases, setCases] = useState();

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

      return {
        cases,
        getAllCases,
      };
}