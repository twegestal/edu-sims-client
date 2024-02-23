import AuthContext from '../hooks/useAuth';
import { useState } from 'react';
import { useApi } from '../hooks/useApi.js';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const loginApi = useApi('login');
  //register
  //refreshToken

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

  return <AuthContext.Provider value={{ user, login }}>{children}</AuthContext.Provider>;
};
