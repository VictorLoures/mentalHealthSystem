import { notifications } from "@mantine/notifications";

export const TOKEN = "doctor";

export const showError = (title: string) => {
  notifications.show({
    title,
    message: "",
    color: "red",
    position: "top-center",
  });
};
