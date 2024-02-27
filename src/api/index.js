import { authApi } from './authApi';
import { userApi } from './userApi';

export const api = (apiClient) =>
  Object.freeze({
    ...authApi(apiClient),
    ...userApi(apiClient),
  });
