import { Provider } from "react-redux";
import UserProvider from "./UserProvider";
import { store } from "../Redux/Store";
import ChatProvider from "./ChatProvider";

const Context = ({ children }) => {
  return (
    <Provider store={store}>
      <UserProvider>
        <ChatProvider>{children}</ChatProvider>
      </UserProvider>
    </Provider>
  );
};

export default Context;
