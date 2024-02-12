import { createContext, useContext } from "react";
import useChat from "../hooks/useChat";

export const ChatContext = createContext();
export default function ChatProvider({ children }) {
  return (
    <ChatContext.Provider value={{ ...useChat() }}>
      {children}
    </ChatContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useChatCtx = () => useContext(ChatContext);
