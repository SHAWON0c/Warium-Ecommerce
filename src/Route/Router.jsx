import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home";
import AboutUs from "../Pages/AboutUs";
import VendorUplaod from "../DashBoard/VendorDashboard/VendorUplaod";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import UserProfile from "../Pages/User/UserProfile";
import ProfileLayout from "../Layouts/ProfileLayout";
import History from "../Pages/User/History";
import Invoice from "../Pages/User/Invoice";
import Wishlist from "../Pages/User/Wishlist";
import Cart from "../Pages/User/CartCheckout";
import PrivateRoute from "./PrivateRoute";
import Secrate from "../Shared/Secrate";
import Redirect from "./Redirect";
import AdminDashboard from "../DashBoard/AdminDashboard/AdminDashboard";
import DashBoard from "../Layouts/DashBoard";
import AdminRequest from "../Pages/AdminRequest/AdminRequest";
import MakeRequest from "../DashBoard/Request/MakeRequest";
import Allusers from "../DashBoard/AdminDashboard/Allusers";
import AllVendors from "../DashBoard/AdminDashboard/AllVendors";
import Allmoderators from "../DashBoard/AdminDashboard/Allmoderators";
import VendorProductsDashboard from "../DashBoard/VendorDashboard/VendorProductsDashboard";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import ProductDetailslayout from "../Layouts/ProductDetailslayout";
import VendorProducts from "../DashBoard/VendorDashboard/Vendor_Products";
import VendorTrackShipping from "../DashBoard/VendorDashboard/VendorTrackShipping";
import VendorSetting from "../DashBoard/VendorDashboard/VendorSetting";
import PublicProfileSection from "../DashBoard/VendorDashboard/PublicProfileSection";
import CartCheckout from "../Pages/User/CartCheckout";
import TshirtCustomizer from "../AIfeatures/pages/TshirtCustomizer";
import Coupon from "../DashBoard/ModeratorDashboard/Coupon";
import CouponApprovals from "../DashBoard/AdminDashboard/CouponAprovals";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children:
      [
        {
          path: '/',
          element: <Home />
        },
        {
          path:'/thirt-customization',
          element:<TshirtCustomizer></TshirtCustomizer>

        },
        {
          path: 'aboutus',
          element: <AboutUs></AboutUs>

        },

        {
          path: 'wishlist',
          element: <Wishlist></Wishlist>
        },
        {
          path: 'login',
          element: <Redirect><Login></Login></Redirect>
        },
        {
          path: 'register',
          element: <Register></Register>
        },
        {
          path: 'secrate',
          element: <PrivateRoute><Secrate></Secrate></PrivateRoute>
        },
        {
          path:'products',
          element: <ProductDetailslayout></ProductDetailslayout>,
          children: [
            {
              path:'details',
              element: <ProductDetails></ProductDetails>
            }
          ]

        }
       
      ]

  },

  {
    path: 'dashboard',
    element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
    children:
      [
        {
          path: 'admin',
          element: <AdminDashboard></AdminDashboard>
        },
        {
          path: 'makeAdmin',
          element: <AdminRequest></AdminRequest>
        },
        {
          path: 'request',
          element: <PrivateRoute><MakeRequest></MakeRequest></PrivateRoute>
        },
        {
          path: 'all-users',
          element: <Allusers></Allusers>
        },
        {
          path: 'all-vendors',
          element: <AllVendors></AllVendors>
        },
        {
          path: 'all-moderators',
          element: <Allmoderators></Allmoderators>
        },
        {
          path: 'vendor-upload/:id?',
          element: <VendorUplaod></VendorUplaod>
        },
        {
          path:'vendor-products',
          element:<VendorProducts></VendorProducts>

        },
         {
          path:'vendor-track-shipping',
          element:<VendorTrackShipping></VendorTrackShipping>

        },
          {
          path:'vendor-setting',
          element:<VendorSetting></VendorSetting>
        },
        {
          path: 'vendor-profile',
          element:<PublicProfileSection></PublicProfileSection>
        },
        {
          path: 'user-profile',
          element: <UserProfile></UserProfile>
        },
        {
          path: 'wishlist',
          element: <Wishlist></Wishlist>
        },
        {
          path:'invoice',
          element: <Invoice></Invoice>
        },
        {
          path: 'history',
          element: <History></History>
        },
        {
          path:"vendors-products-details",
          element:<VendorProductsDashboard></VendorProductsDashboard>
        },
        {
          path:'add-coupon',
          element:<Coupon></Coupon>
        },
        {
          path:'approve-coupon',
          element:<CouponApprovals></CouponApprovals>
        }
      

      ]
  }
]);