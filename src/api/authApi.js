import { packageResponse } from '../utils/apiUtils';

export const authApi = (apiClient) => ({
  login: async (body) => {
    const response = await apiClient.post('auth/login', body);
    return packageResponse(response);
  },

  register: async (body) => {
    const response = await apiClient.post('auth/register', body);
    return await packageResponse(response);
  },

  refreshToken: async () => {
    const response = await apiClient.get('auth/refresh-token');
    return await packageResponse(response);
  },
});
