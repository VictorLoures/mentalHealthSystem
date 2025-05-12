import { Router, Request, Response } from "express";
import DoctorController from "./controller/DoctorController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import LoginController from "./controller/LoginController";
import PatientController from "./controller/PatientController";

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

routes.get(
  "/findPatientById/:idPatient",
  isAuthenticated,
  new PatientController().findById
);

routes.get(
  "/findByAllByDoctorId/:idDoctor",
  isAuthenticated,
  new PatientController().findByAllByDoctorId
);

// POST
routes.post("/createPatient", isAuthenticated, new PatientController().create);

// PUT
routes.put("/updateDoctor", isAuthenticated, new DoctorController().update);
routes.put("/updatePatient", isAuthenticated, new PatientController().update);

export { routes };
