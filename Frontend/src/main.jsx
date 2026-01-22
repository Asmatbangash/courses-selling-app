import { createRoot } from "react-dom/client";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import {
  Home,
  Courses,
  Purchases,
  Login,
  SignUp,
  Settings,
  Buy,
} from "./pages";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Load Stripe with your public key
const stripePromise = loadStripe(
  "pk_test_51SruLZJNbviK3qXfJ55IqRglSipttnpR6jyoUIEFgjBoxACaU16I0t78rjJVRE39z5CwAENIPnZsASWeiO7JJm4S00JPVcDzGE",
);
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Elements stripe={stripePromise}>
        <App />{" "}
      </Elements>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/courses", element: <Courses /> },
      { path: "/purchased-courses", element: <Purchases /> },
      {
        path: "/buy/:courseId",
        element: <Buy />,
      },
      { path: "/settings", element: <Settings /> },
      { path: "/sign-up", element: <SignUp /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
