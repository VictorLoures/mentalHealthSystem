import { Request, Response } from "express";
import DoctorService from "../service/DoctorService";

export default class DoctorController {
  async findAll(req: Request, res: Response) {
    return res.json(await new DoctorService().findAll());
  }

  async findById(req: Request, res: Response) {
    return res.json(
      await new DoctorService().findById(Number(req.params.idDoctor))
    );
  }

  async create(req: Request, res: Response) {
    return res.json(await new DoctorService().create(req.body));
  }

  async update(req: Request, res: Response) {
    return res.json(await new DoctorService().update(req.body));
  }
}
