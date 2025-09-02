import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { routes } from "./routes";
import { initDB } from "./configBd/data-source";

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({ error: err.message });
  }

  return res
    .status(500)
    .json({ status: "error", message: "Internal server error" });
});

initDB().then(() => {
  app.listen(3333, () => console.log("Server online"));
});
