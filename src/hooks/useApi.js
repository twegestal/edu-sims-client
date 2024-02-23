import ky from 'ky';
import { useMemo } from 'react';
import { useAuth } from './useAuth';
import { api } from '../api/index';
//TODO: updateToken i useAutj

const prefixUrl = import.meta.env.VITE_API_BASE_URL || '/api';

const getHeaders = (token) => ({
  'Content-Type': 'application/json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

export const useApi = (method) => {
  const { user, updateToken } = useAuth() || {}; //TODO: glöm inte updateToken!
  const token = user ? user.token : undefined;

  const apiClient = useMemo(
    () =>
      ky.create({
        prefixUrl,
        headers: getHeaders(token),
        hooks: {
          afterResponse: [
            async (_request, _options, response) => {
              const newToken = response.headers.get('X-New-Token');
              if (newToken) {
                updateToken(newToken);
              }
            },
          ],
        },
      }),
    [token, updateToken],
  );

  return async (options = {}) => {
    const { body, headers: customHeaders } = options;
    const finalOptions = {
      json: body,
      headers: {
        ...getHeaders(token),
        ...customHeaders,
      },
    };
    const apiMethod = api(apiClient)[method];
    if (typeof apiMethod !== 'function') {
      throw new Error(`API method ${method} is not defined`);
    }

    return apiMethod(finalOptions);
  };
};
