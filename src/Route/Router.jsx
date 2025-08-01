import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home";
import AboutUs from "../Pages/AboutUs";
import VendorUplaod from "../Pages/VendorUplaod";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import UserProfile from "../Pages/User/UserProfile";
import ProfileLayout from "../Layouts/ProfileLayout";
import History from "../Pages/User/History";
import Invoice from "../Pages/User/Invoice";
import Wishlist from "../Pages/User/Wishlist";
import Cart from "../Pages/User/Cart";
import PrivateRoute from "./PrivateRoute";
import Secrate from "../Shared/Secrate";
import Redirect from "./Redirect";
import AdminDashboard from "../DashBoard/AdminDashboard/AdminDashboard";
import DashBoard from "../Layouts/DashBoard";
import AdminRequest from "../Pages/AdminRequest/AdminRequest";

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
          path:'profile/',
          element:<ProfileLayout></ProfileLayout>,
          children:[
            {
              index:true,
              element:<UserProfile></UserProfile>
            },
            {
              path:'history',
              element:<History></History>
            },
            {
              path:'invoice',
              element:<Invoice></Invoice>
            }

          ]
        },
        {
          path:'profile',
          element:<UserProfile></UserProfile>

        },
        {
          path:'wishlist',
          element:<Wishlist></Wishlist>
        },
        {
          path:'cart',
          element:<Cart></Cart>

        },
        {
          path:'login',
          element:<Redirect><Login></Login></Redirect>
        },
        {
          path:'register',
          element:<Register></Register>
        },
        {
          path:'secrate',
          element:<PrivateRoute><Secrate></Secrate></PrivateRoute>
        }
    ]

  },

  {
    path:'dashboard',
    element:<DashBoard></DashBoard>,
    children:
    [
      {
        path:'admin',
        element:<AdminDashboard></AdminDashboard>
      },
      {
        path:'makeAdmin',
        element:<AdminRequest></AdminRequest>
      }
    ]
  }
]);