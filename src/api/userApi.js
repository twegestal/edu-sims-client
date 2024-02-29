import { packageResponse } from '../utils/apiUtils';

export const userApi = (apiClient) => ({
  logout: async () => {
    const response = await apiClient.patch('user/logout');
    return packageResponse(response);
  },
});
