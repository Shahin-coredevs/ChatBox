import ReactDOM from "react-dom/client";
import "./index.css";
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import LogIn from "./Components/LogIn";
import Root from "./Root";
import Inbox from "./Components/Inbox";
import SignUp from "./Components/SignUp";
import ContextProvider from "./Context/ContextProvider";

  const router = createBrowserRouter([
    {
      path: "/",
      element:<Root/>,
      children:[
        {
            path:"/",
            element:<LogIn/>
        },
        {
          path:"/signup",
          element:<SignUp/>      

        },
        {
            path:"/inbox",
            element: <Inbox/>
        }
      ]
    },
  ]);

ReactDOM.createRoot(document.getElementById("root")).render(
<ContextProvider>
  <RouterProvider router={router} />
</ContextProvider>
);
