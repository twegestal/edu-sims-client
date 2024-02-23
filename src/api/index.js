import { authApi } from './authApi';

export const api = (apiClient) =>
  Object.freeze({
    ...authApi(apiClient),
  });
