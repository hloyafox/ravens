import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import LocationCard from './location/LocationCard';
import InfoPanel from './admin-panel/InfoPanel';
import AuthRedirect from './meisters/AuthRedirect';
import RavensList from './ravens/RavensList';
import EditMessage from './messages/EditMessage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '',
  },

  {
    path: '/location/:locationId',
    element: <AuthRedirect />,
  },

  {
    path: '/location/card/:locationId',
    element: <LocationCard />,
  },
  {
    path: '/location/card/:locationId/ravens',
    element: <RavensList />,
  },
  {
    path: '/location/send',
    element: <EditMessage />,
  },
  {
    path: '/admin/:locationId',
    element: <InfoPanel />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
