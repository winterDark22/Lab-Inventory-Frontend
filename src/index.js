import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import EquipmentsContextProvider from "./context/EquipmentsContext";
import AuthContextProvider from "./context/AuthContext";
import StorageContextProvider from "./context/StorageContext";
import NotificationContextProvider from "./context/NotificationContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <StorageContextProvider>
        <EquipmentsContextProvider>
          <NotificationContextProvider>
            <App />
          </NotificationContextProvider>
        </EquipmentsContextProvider>
      </StorageContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
