import { Router, Request, Response } from "express";

const routes = Router();

routes.get("/health", (req: Request, res: Response) => {
  return res.status(200).json({ message: "OK" });
});

export { routes };
