import { createBrowserRouter } from "react-router";
import Main from "../layouts/Main";
import ErrorPage from "../pages/error/ErrorPage";
import Home from "../pages/home/Home";
import SignIn from "../pages/signIn/SignIn";
import SignUp from "../pages/signUp/SignUp";
import UserProfile from "../pages/userProfile/UserProfile";
import AddTouristSpot from "../pages/touristSpot/AddTouristSpot";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/user-profile",
        element: <UserProfile />,
      },
      {
        path: "/add-tourist-spot",
        element: <AddTouristSpot />,
      },
    ],
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
]);
