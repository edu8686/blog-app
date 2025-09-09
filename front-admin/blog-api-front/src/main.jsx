import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './pages/Login.jsx';
import Layout from './layout.jsx';
import Home from './pages/Home.jsx';
import Form from './pages/Form.jsx';
import { getPostById, updatePost } from './api.js';
import PrivateRoute from './components/PrivateRoute.jsx';
//import PostDetail from './components/PostDetail.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "login", element: <Login /> },
      { index: true, element: <Login /> },

      // Rutas privadas
      {
        element: <PrivateRoute />, // envuelve rutas que requieren auth
        children: [
          { path: "home", element: <Home /> },
          { path: "new-post", element: <Form edit={false} /> },
          { path: "edit-post/:id", element: <Form updatePost={updatePost} edit={true} post={getPostById} /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
