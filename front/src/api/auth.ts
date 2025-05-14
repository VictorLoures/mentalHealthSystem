import api from "./api";
import { LoggedDoctor } from "../model/LoggedDoctor";
import { TOKEN } from "../utils/util";

export const getStorageToken = () => localStorage.getItem(TOKEN);

export const logout = () => {
  localStorage.removeItem(TOKEN);
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
