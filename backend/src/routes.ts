import { Router, Request, Response } from "express";
import DoctorController from "./controller/DoctorController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import LoginController from "./controller/LoginController";
import PatientController from "./controller/PatientController";
import ConsultationController from "./controller/ConsultationController";

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

routes.get(
  "/findConsultationById/:id",
  isAuthenticated,
  new ConsultationController().findById
);

routes.get(
  "/findAllByDoctorId/:idDoctor",
  isAuthenticated,
  new ConsultationController().findAllByDoctorId
);

routes.get(
  "/findAllByPatientId/:idPatient",
  isAuthenticated,
  new ConsultationController().findAllByPatientId
);

routes.get(
  "/token/validate",
  isAuthenticated,
  new LoginController().decryptToken
);

// POST
routes.post("/createPatient", isAuthenticated, new PatientController().create);
routes.post(
  "/createConsultation",
  isAuthenticated,
  new ConsultationController().create
);

// PUT
routes.put("/updateDoctor", isAuthenticated, new DoctorController().update);
routes.put("/updatePatient", isAuthenticated, new PatientController().update);
routes.put(
  "/updateConsultation",
  isAuthenticated,
  new ConsultationController().update
);

// DELETE
routes.delete(
  "/deleteConsultation/:id",
  isAuthenticated,
  new ConsultationController().delete
);

export { routes };
