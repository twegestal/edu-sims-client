import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Home.page';
import AuthPage from './pages/Auth.page';
import CasePage from './pages/Case.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    path: '/case',
    element: <CasePage />,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
