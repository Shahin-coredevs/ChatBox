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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <LogIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/inbox",
        element: <Inbox />,
      },
      {
        path: "/photo",
        element: <InputFile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Context>
    <RouterProvider router={router} />
  </Context>
);
