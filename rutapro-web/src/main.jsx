import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

import { AuthProvider } from "./context/AuthContext";

import "./styles/global.css";
import "./styles/layout.css";


ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <AuthProvider>

    <App />

  </AuthProvider>

);