import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./reducers/chatReducer";

export const store = configureStore({
  reducer: {
    chatStore: chatReducer
  }
})