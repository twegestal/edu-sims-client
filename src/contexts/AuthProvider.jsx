import AuthContext from '../hooks/useAuth';
import { useState } from 'react';
import { useApi } from '../hooks/useApi.js';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const loginApi = useApi('login');
  const registerApi = useApi('register');
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

  const register = async (email, password, group_id) => {
    try {
      const response = await registerApi({
        body: {
          email: email,
          password: password,
          group_id: group_id,
        },
      });

      return response.status;
    } catch (error) {
      console.error('Registration failed', error);
      return error.response.status;
    }
  };

  return <AuthContext.Provider value={{ user, login, register }}>{children}</AuthContext.Provider>;
};
