import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = getTokenFromParam(req, res);

  try {
    verify(token, process.env.JWT_SECRET) as Payload;
    return next();
  } catch (error) {
    return res.status(401).end();
  }
}

export function getTokenFromParam(req, res) {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split(" ");
  return token;
}
