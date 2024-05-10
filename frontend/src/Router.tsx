import { createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/SignIn";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import MyTours from "./pages/MyTours";
import AddTour from "./pages/AddTour";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
    index: true,
  },
  {
    path: "/Register",
    element: <Register />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/HomePage",
        element: <HomePage />,
      },
      {
        path: "/MyTours",
        element: <MyTours />,
      },
      {
        path: "/AddTour",
        element: <AddTour />,
      },
    ],
  },
  {
    path: "*",
    element: <p>404 Error - Nothing here...</p>,
  },
]);

export default router;
