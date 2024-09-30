import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GuestProvider } from "./Context/GuestContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GuestProvider>
      <App />
    </GuestProvider>
  </React.StrictMode>
);
