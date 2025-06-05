import { Request, Response } from "express";
import ConsultationService from "../service/ConsultationService";

export default class ConsultationController {
  async findById(req: Request, res: Response) {
    return res.json(
      await new ConsultationService().findById(Number(req.params.id))
    );
  }

  async findAllByDoctorId(req: Request, res: Response) {
    return res.json(
      await new ConsultationService().findAllByDoctorId(
        Number(req.params.idDoctor)
      )
    );
  }

  async findAllByPatientId(req: Request, res: Response) {
    return res.json(
      await new ConsultationService().findAllByPatientId(
        Number(req.params.idPatient)
      )
    );
  }

  async create(req: Request, res: Response) {
    return res.json(await new ConsultationService().create(req.body));
  }

  async update(req: Request, res: Response) {
    return res.json(await new ConsultationService().update(req.body));
  }

  async delete(req: Request, res: Response) {
    return res.json(
      await new ConsultationService().delete(Number(req.params.id))
    );
  }

  async findAllByDoctorIdInDay(req: Request, res: Response) {
    return res.json(
      await new ConsultationService().findAllByDoctorIdInDay(
        Number(req.params.idDoctor)
      )
    );
  }

  async payConsultation(req: Request, res: Response) {
    await new ConsultationService().payConsultation(
      Number(req.params.idConsultation)
    );
    return res.status(200).json(null);
  }
}
