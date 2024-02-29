import { authApi } from './authApi';

import { caseApi } from './caseApi';

import { userApi } from './userApi';


export const api = (apiClient) =>
  Object.freeze({
    ...authApi(apiClient),

    ...caseApi(apiClient),

    ...userApi(apiClient),

  });
