import api from "./api";
import { LoggedDoctor } from "../model/LoggedDoctor";

export const getStorageToken = () => localStorage.getItem("doctor");

export const logout = () => {
  localStorage.removeItem("doctor");
};

export const validateToken = () =>
  new Promise<LoggedDoctor | null>((resolve) => {
    const token = getStorageToken();
    if (token) {
      api
        .get("/token/validate")
        .then((response) => {
          resolve(response.data);
        })
        .catch(() => {
          logout();
          resolve(null);
        });
    } else {
      resolve(null);
    }
  });
