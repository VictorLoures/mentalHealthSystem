import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { MantineProvider } from "@mantine/core";
import AppRoutes from "./routes/AppRoutes";
import { Notifications } from "@mantine/notifications";
import { LoadingProvider } from "./context/LoadingContext";
import { DatesProvider } from "@mantine/dates";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import { ModalsProvider } from "@mantine/modals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <MantineProvider>
      <ModalsProvider>
        <DatesProvider settings={{ locale: "pt-BR" }}>
          <AuthProvider>
            <LoadingProvider>
              <Notifications />
              <AppRoutes />
            </LoadingProvider>
          </AuthProvider>
        </DatesProvider>
      </ModalsProvider>
    </MantineProvider>
  </React.StrictMode>
);
