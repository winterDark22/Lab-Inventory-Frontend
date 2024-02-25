import { useReducer, useContext, createContext, useState } from "react";

export const NotificationContext = createContext();

export function useNotificationContext() {
  const context = useContext(NotificationContext); //return a obj = { state, dispatch}

  if (!context) {
    throw Error(
      "Notification Context  must be used inside an NotificationContextProvider"
    );
  }
  return context;
}

function NotificationContextProvider({ children }) {
  const [newNotificationCnt, setNewNotificationCnt] = useState(0);

  return (
    <NotificationContext.Provider
      value={{ newNotificationCnt, setNewNotificationCnt }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContextProvider;
