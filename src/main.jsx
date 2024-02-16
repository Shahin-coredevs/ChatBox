import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogIn from "./Components/LogIn";
import Root from "./Root";
import Inbox from "./Components/Inbox";
import SignUp from "./Components/SignUp";
import UserProvider from "./Context/UserProvider";
import InputFile from "./Components/InputFile";
import { Provider } from "react-redux";
import Context from "./Context/Context";
import Sign from "./Components/Sign";
import SignIn from "./Components/SignIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <SignIn />,
      },
      {
        path: "/inbox",
        element: <Inbox />,
      },
      {
        path: "/signup",
        element: <Sign />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Context>
    <RouterProvider router={router} />
  </Context>
);
