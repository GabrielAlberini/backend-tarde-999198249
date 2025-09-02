import React from "react";
import ReactDOM from "react-dom/client";
import RouterApp from "./router/RouterApp";
import { UserProvider } from "./context/UserContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterApp />
    </UserProvider>
  </React.StrictMode>
);
