import { RequestHandler } from "express";
import { validationResult } from "express-validator";

export const fieldsValidator: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   return res.status(400).json({
  //     ok: true,
  //     errors: errors.mapped(),
  //   });
  // }

  if (!errors.isEmpty()) {
    const errorsArray = [];

    const errorsMapped = errors.mapped();

    for (const property in errorsMapped) {
      errorsArray.push(errorsMapped[property].msg);
    }

    const errorsString = errorsArray
      .slice(0, -1)
      .join(", ")
      .concat(" y " + errorsArray.slice(-1));

    return res.status(400).json({
      ok: false,
      msg: errorsString,
    });
  }

  next();
};
