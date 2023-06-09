import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';



import {
  createBrowserRouter,
  RouterProvider,
  Link,
  
} from "react-router-dom";

import ErrorPage from './pages/ErrorPage';
import ClothesStore from './pages/ClothesStore';
import Root from './Root';
import Statistics from './pages/Statistics';
import HelpPage from './pages/HelpPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,

  },
  {
    path: "/home",
    element: <ClothesStore />,
  },
  {
    // this route is for handling the api calls
    path: "/api",
    element: null,
  },
  {
    path: "/statistics",
    element: <Statistics/>,
  },
  {
    path: "/help",
    element: <HelpPage />
  }



]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<>
  {/* <React.StrictMode> */}
    <RouterProvider router={router} />

    {/* <BrowserRouter> */}
    {/* <App /> */}
    {/* </BrowserRouter> */}
  {/* </React.StrictMode> */}

  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
