import AuthContext from '../hooks/useAuth';
import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi.js';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const loginApi = useApi('login');
  const registerApi = useApi('register');
  const refreshTokenApi = useApi('refreshToken');

  useEffect(() => {
    if (!user) {
      loginWithRefreshToken();
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      const response = await loginApi({ body: { email, password } });
      if (response.data.token) {
        setUser(response.data);
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const loginWithRefreshToken = async () => {
    try {
      const response = await refreshTokenApi();
      setUser(response.data);
    } catch (error) {}
  };

  const register = async (email, password, group_id) => {
    try {
      const response = await registerApi({
        body: {
          email: email,
          password: password,
          group_id: group_id,
        },
      });

      setUser(response.data);

      return response;
    } catch (error) {
      console.error('Registration failed', error);
      return error.response.status;
    }
  };

  return <AuthContext.Provider value={{ user, login, register }}>{children}</AuthContext.Provider>;
};
