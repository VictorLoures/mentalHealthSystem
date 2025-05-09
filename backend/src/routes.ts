import { Router, Request, Response } from "express";
import DoctorController from "./controller/DoctorController";
import { isAuthenticated } from "./middlewares/isAuthenticated";

const routes = Router();

routes.get("/health", (req: Request, res: Response) => {
  return res.status(200).json({ message: "OK" });
});
routes.post("/createDoctor", new DoctorController().create);
routes.put("/updateDoctor", new DoctorController().update);
routes.get("/findAllDoctors", new DoctorController().findAll);

// SAFE ROUTES

routes.get("/findDoctorById", isAuthenticated, new DoctorController().findById);

export { routes };
