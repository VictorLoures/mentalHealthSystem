import { Request, Response } from "express";
import CEPService from "../service/CEPService";

export default class CEPController {
  async consultar(req: Request, res: Response) {
    return res.json(await new CEPService().consultar(req.params.cep));
  }
}
