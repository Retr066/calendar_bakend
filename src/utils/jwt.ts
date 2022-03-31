import jwt from "jsonwebtoken";
import config from "../config";

export const generarJWT = (uid: string, fullName: string) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, fullName };

    jwt.sign(
      payload,
      config.SECRET_JWT_SEED,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.error(err);
          reject("No se pudo generar el token");
        }
        resolve(token);
      }
    );
  });
};
