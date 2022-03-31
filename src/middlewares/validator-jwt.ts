import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

export const validatorJWT: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la peticion",
    });
  }

  try {
    const payload: any = jwt.verify(token, config.SECRET_JWT_SEED);
    req.body.uid = payload.uid;
    req.body.fullName = payload.fullName;
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      ok: false,
      msg: "Token no valido",
    });
  }
  next();
};
