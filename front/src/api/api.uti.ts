import { showError, showSuccess } from "../utils/util";
import api from "./api";

export const create = (
  route: string,
  obj: any,
  msg: string,
  navigateFunction: (routeRedirect: string) => void,
  routeRedirect: string = "/"
) => {
  api
    .post(route, obj)
    .then(() => {
      showSuccess(msg);
      navigateFunction(routeRedirect);
    })
    .catch((error) => {
      showError(error.response.data);
    });
};

export const update = (
  route: string,
  obj: any,
  msg: string,
  navigateFunction: (routeRedirect: string) => void,
  routeRedirect: string = "/"
) => {
  api
    .put(route, obj)
    .then(() => {
      showSuccess(msg);
      navigateFunction(routeRedirect);
    })
    .catch((error) => {
      showError(error.response.data);
    });
};
