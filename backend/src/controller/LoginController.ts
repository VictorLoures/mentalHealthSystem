import { Request, Response } from "express";
import LoginService from "../service/LoginService";
import { getTokenFromParam } from "../middlewares/isAuthenticated";

export default class LoginController {
  async login(req: Request, res: Response) {
    try {
      return res.json(await new LoginService().login(req.body));
    } catch (error) {
      return res.status(401).json({ error: "Login ou senha inválidos!" });
    }
  }

  async decryptToken(req: Request, res: Response) {
    const token = getTokenFromParam(req, res);
    return res.json(await new LoginService().decryptToken(token));
  }
}
