import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LocationCard from './location/LocationCard';
import InfoPanel from './admin-panel/InfoPanel';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },

  {
    path: '/location/card/:locationId',
    element: <LocationCard />,
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
