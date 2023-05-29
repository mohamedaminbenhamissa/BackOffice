import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/FormationPage';
import UserPage from './pages/UserPage';
import UserUpdate from './sections/@dashboard/user/UserUpdate'
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import WebinarePage from './pages/WebinairePage';
import DashboardAppPage from './pages/DashboardAppPage';
import Profile from './layouts/dashboard/header/Profile';
import Historique from './layouts/dashboard/header/Historique';
import Scan from './pages/Scan';
import InscrireForm from './sections/auth/login/InscrireForm'; 
import Calander from './pages/Calander';
import Totale from './pages/Totale';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Navigate to="/login" />,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'utilisateur', element: <UserPage /> },
        { path: 'UserUpdate/:id', element:<UserUpdate/>},
        { path: 'webinaire', element: <WebinarePage /> },
        { path: 'formation', element: <BlogPage /> },
        { path: 'Profile', element: <Profile />},
        { path: 'Historique', element: <Historique />},
        { path: 'Scan', element: <Scan />},
        { path: 'InscrireForm', element: <InscrireForm /> },
        { path: 'Calander', element: <Calander /> },
        { path: 'Totale', element: <Totale /> }
    


      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
