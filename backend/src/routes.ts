import { Router, Request, Response } from "express";
import DoctorController from "./controller/DoctorController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import LoginController from "./controller/LoginController";

const routes = Router();

// TEST ROUTES
routes.get("/findAllDoctors", new DoctorController().findAll);

// OPEN ROUTES
routes.post("/createDoctor", new DoctorController().create);
routes.post("/login", new LoginController().login);

// SAFE ROUTES
// GET
routes.get(
  "/findDoctorById/:idDoctor",
  isAuthenticated,
  new DoctorController().findById
);

// POST

// PUT
routes.put("/updateDoctor", isAuthenticated, new DoctorController().update);

export { routes };
