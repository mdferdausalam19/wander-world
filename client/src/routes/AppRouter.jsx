import { createBrowserRouter } from "react-router";
import Main from "../layouts/Main";
import ErrorPage from "../pages/error/ErrorPage";
import Home from "../pages/home/Home";
import SignIn from "../pages/signIn/SignIn";
import SignUp from "../pages/signUp/SignUp";
import UserProfile from "../pages/userProfile/UserProfile";
import AddTouristSpot from "../pages/touristSpot/AddTouristSpot";
import PrivateRoute from "./PrivateRoute";
import AllTouristSpots from "../pages/touristSpot/AllTouristSpots";
import TouristSpotDetails from "../pages/touristSpot/TouristSpotDetails";
import MyList from "../pages/user/MyList";
import AdminDashboard from "../pages/admin/Dashboard";
import AdminRoute from "./AdminRoute";
import HostRoute from "./HostRoute";
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
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-tourist-spot",
        element: (
          <PrivateRoute>
            <HostRoute>
              <AddTouristSpot />
            </HostRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/all-tourist-spots",
        element: (
          <PrivateRoute>
            <AllTouristSpots />
          </PrivateRoute>
        ),
      },
      {
        path: "/tourist-spot/:id",
        element: (
          <PrivateRoute>
            <TouristSpotDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-list",
        element: (
          <PrivateRoute>
            <HostRoute>
              <MyList />
            </HostRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/dashboard",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          </PrivateRoute>
        ),
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
