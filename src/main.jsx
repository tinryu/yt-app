import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { 
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import './index.css'
import Layout from './pages/Layout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import PlayList, {
  loader as playlistLoader,
} from './pages/Lists';
import CreateList from './pages/CreateList';
import Detail, {
  loader as detailLoader,
} from './pages/Detail';
import Register from './pages/Register';
import Login from './pages/Login';
import NoPage from './pages/NoPage';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <NoPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <NoPage />,
  },
  {
    path: "/",
    element: <Layout/>,
    errorElement: <NoPage />,
    children: [
      {
        path: "/home",
        element: <Home />,
        errorElement: <NoPage />,
      },
      {
        path: "/contact",
        element: <Contact />,
        errorElement: <NoPage />,
      },
      {
        path: "/play-list",
        index: true,
        element: <PlayList/>,
        errorElement: <NoPage />,
        loader: playlistLoader,
      },
      {
        path: "/play-list/:playlistId/:Id",
        element: <Detail/>,
        errorElement: <NoPage/>,
        loader: detailLoader,
      },
      {
        path: "/create-list",
        element: <CreateList />,
        errorElement: <NoPage/>,
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);