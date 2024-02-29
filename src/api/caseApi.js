import { packageResponse } from '../utils/apiUtils';
const prefix = 'case/';
export const caseApi = (apiClient) => ({

  getAllCases: async () => {
    const response = await apiClient.get(`${prefix}`);
    return packageResponse(response);
  },

});