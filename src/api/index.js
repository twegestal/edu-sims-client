import { authApi } from './authApi';
import { caseApi } from './caseApi';

export const api = (apiClient) =>
  Object.freeze({
    ...authApi(apiClient),
    ...caseApi(apiClient),
  });
