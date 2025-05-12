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
    try {
      return res.json(await new DoctorService().create(req.body));
    } catch (err) {
      console.log(err);
      return res.status(409).json(err.message);
    }
  }

  async update(req: Request, res: Response) {
    try {
      return res.json(await new DoctorService().update(req.body));
    } catch (err) {
      return res.status(409).json(err.message);
    }
  }
}
