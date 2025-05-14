import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { MantineProvider } from "@mantine/core";
import AppRoutes from "./routes/AppRoutes";
import { Notifications } from "@mantine/notifications";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <MantineProvider>
      <AuthProvider>
        <Notifications />
        <AppRoutes />
      </AuthProvider>
    </MantineProvider>
  </React.StrictMode>
);
