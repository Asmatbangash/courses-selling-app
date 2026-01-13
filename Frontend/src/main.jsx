import { createRoot } from 'react-dom/client'
import './index.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import App from './App.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import {Home, Login, SignUp} from './pages';

let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
      path:"/",
      element: <Home />
    },
    {
      path:"/sign-up",
      element:<SignUp />
    },
    {
      path:"/login",
      element:<Login />
    }
  ]
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
