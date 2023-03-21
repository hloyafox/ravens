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
import MessagesList from './messages/MessagesList';
import Message from './messages/Message';
import CurrentCard from './admin-panel/CurrentCard';
import EditRaven from './admin-panel/EditRaven';
import Error from './Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/error',
    element: <Error />,
  },
  {
    path: '/location/:locationId',
    element: <AuthRedirect />,
  },
  {
    path: '/location/admin',
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
    path: '/location/card/:locationId/messages',
    element: <MessagesList />,
  },
  {
    path: '/location/card/:locationId/message/:messageId',
    element: <Message />,
  },
  {
    path: '/location/send/:ravenId',
    element: <EditMessage />,
  },
  {
    path: '/location/admin/:adminId',
    element: <InfoPanel />,
  },
  {
    path: '/admin/location/:locationId',
    element: <CurrentCard />,
  },
  {
    path: '/admin/edit/raven/:ravenId',
    element: <EditRaven />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
