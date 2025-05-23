import { Request, Response } from "express";
import PatientService from "../service/PatientService";

export default class PatientController {
  async findByAllByDoctorId(req: Request, res: Response) {
    return res.json(
      await new PatientService().findByAllByDoctorId(
        Number(req.params.idDoctor)
      )
    );
  }

  async findById(req: Request, res: Response) {
    return res.json(
      await new PatientService().findById(Number(req.params.idPatient))
    );
  }

  async create(req: Request, res: Response) {
    try {
      return res.json(await new PatientService().create(req.body));
    } catch (err) {
      console.log(err);
      return res.status(409).json(err.message);
    }
  }

  async update(req: Request, res: Response) {
    try {
      return res.json(await new PatientService().update(req.body));
    } catch (err) {
      console.log(err);
      return res.status(409).json(err.message);
    }
  }

  async findPatientByQuery(req: Request, res: Response) {
    return res.json(
      await new PatientService().findPatientByQuery(
        req.params.doctorId,
        req.params.query
      )
    );
  }
}
