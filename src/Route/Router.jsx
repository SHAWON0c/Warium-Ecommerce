import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home";
import AboutUs from "../Pages/AboutUs";

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

        }
    ]

  },
]);