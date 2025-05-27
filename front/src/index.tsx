import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { MantineProvider } from "@mantine/core";
import AppRoutes from "./routes/AppRoutes";
import { Notifications } from "@mantine/notifications";
import { LoadingProvider } from "./context/LoadingContext";
import { DatesProvider } from "@mantine/dates";

import dayjs from "dayjs";
import "dayjs/locale/pt-br";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import { ModalsProvider } from "@mantine/modals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

dayjs.locale("pt-br");

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
