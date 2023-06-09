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
import ErrorPage from './ErrorPage';
import AddRaven from './admin-panel/AddRaven';
import SendMessage from './admin-panel/SendMessage';
import CreateLocation from './admin-panel/CreateLocation';
import MessageAdmin from './admin-panel/MessageAdmin';
import RenameRaven from './ravens/RenameRaven';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/error',
    element: <ErrorPage />,
  },
  {
    path: '/location/enter/:key',
    element: <AuthRedirect />,
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
    path: '/location/raven/:ravenId/rename',
    element: <RenameRaven />,
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
    path: '/admin/:locationId/message/:messageId',
    element: <MessageAdmin />,
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
    path: '/location/admin/:adminId/send',
    element: <SendMessage />,
  },
  {
    path: '/admin/location/:locationId',
    element: <CurrentCard />,
  },
  {
    path: '/admin/edit/raven/:ravenId',
    element: <EditRaven />,
  },
  {
    path: 'admin/location/:locationId/addRaven',
    element: <AddRaven />,
  },
  {
    path: '/location/admin/:adminId/create',
    element: <CreateLocation />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
