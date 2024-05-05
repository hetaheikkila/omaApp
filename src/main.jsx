import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CustomerList from './Components/CustomerList.jsx';
import TrainingList from './Components/TrainingList.jsx';

const router = createBrowserRouter([  // Import components that are used in routes
  {
    path: "/",
    element: <App />,
    children: [                       // children are nested routes with a route
      {
        element: <CustomerList />,
        index: true                   // index route does not need any path
      },
    {
      path: "CustomerList",
      element: <CustomerList />
    },
      {
        path: "TrainingList",                // path can be defined relative to the parent path
        element: <TrainingList />,
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
