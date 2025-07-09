import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home";
import AboutUs from "../Pages/AboutUs";
import VendorUplaod from "../Pages/VendorUplaod";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    children:
    [
        {
            path:'/',
            element:<Home/>
        },
        {
          path:'aboutus',
          element:<AboutUs></AboutUs>

        },
        {
          path:'vendor_upload',
          element:<VendorUplaod></VendorUplaod>

        },
        {
          path:'login',
          element:<Register></Register>
        }
    ]

  },
]);