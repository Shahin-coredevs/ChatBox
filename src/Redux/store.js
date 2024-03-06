import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./reducers/chatReducer";
import userReducer from "./reducers/userReducer";
import loggedUserReducer from "./reducers/loggedUserReducer";

export const store = configureStore({
  reducer: {
    logger: loggedUserReducer,
    user: userReducer,
    chat: chatReducer,
  }
})
    