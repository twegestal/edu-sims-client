import { useApi } from './useApi';
import { useAuth } from './useAuth';
export const useUser = () => {
  const logoutApi = useApi('logout');
  const { removeLoggedOutUser } = useAuth();

  const logout = async () => {
    try {
      const response = await logoutApi();
      if (response.status === 200) {
        removeLoggedOutUser();
      }
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return {
    logout,
  };
};
