import { createRoot } from "react-dom/client";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import App from "./App.jsx";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
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
import {AdminSignUp, AdminLogin, CreateCourse, OurCourses, Dashboard, UpdateCourse} from "./admin";


// Load Stripe with your public key
const stripePromise = loadStripe(
  "pk_test_51SruLZJNbviK3qXfJ55IqRglSipttnpR6jyoUIEFgjBoxACaU16I0t78rjJVRE39z5CwAENIPnZsASWeiO7JJm4S00JPVcDzGE",
);

 const user = JSON.parse(localStorage.getItem("user"));
  const admin = JSON.parse(localStorage.getItem("admin"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Elements stripe={stripePromise}>
        <App />{" "}
      </Elements>
    ),
    children: [
      { path: "/", element: user ?  <Home /> : <Navigate to="/login" /> },
      { path: "/courses", element: <Courses /> },
      { path: "/purchased-courses", element: <Purchases /> },
      {
        path: "/buy/:courseId",
        element: <Buy />,
      },
      { path: "/settings", element: <Settings /> },
      { path: "/sign-up", element: <SignUp /> },
      { path: "/login", element: <Login /> },

      // admin routes
      { path: "/admin/sign-up", element: <AdminSignUp /> },
      { path: "/admin/login", element:  <AdminLogin /> },
      {path: "/admin/create-course", element: admin ? <CreateCourse /> : <Navigate to="/admin/login" /> },
      {path:"/admin/update-course/:courseId", element:admin ? <UpdateCourse /> : <Navigate to="/admin/login" /> },
      { path: "/admin/our-courses", element: admin ? <OurCourses /> : <Navigate to="/admin/login" /> },
      { path: "/admin/dashboard", element: admin ?  <Dashboard /> : <Navigate to="/admin/login" />},
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
