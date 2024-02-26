import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Home.page';
import AuthPage from './pages/Auth.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
