import { packageResponse } from '../utils/apiUtils';
const prefix = 'case/';
export const caseApi = (apiClient) => ({

  getAllCases: async () => {
    const response = await apiClient.get(`${prefix}`);
    return packageResponse(response);
  },

  getCaseById: async (query) => {
    const response = await apiClient.get(`${prefix}`,query);
    return packageResponse(response);
  },
});