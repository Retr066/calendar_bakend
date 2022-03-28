import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
export const createUser: RequestHandler = async (req, res) => {
  try {
    const { password } = req.body;
    const user = new User(req.body);
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    await user.save();
    res.status(201).json({
      ok: true,
      msg: "Registro satisfactoriamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Algo salio mal",
    });
  }
};

export const Login: RequestHandler = (req, res) => {
  const { email, password } = req.body;

  res.status(200).json({
    ok: true,
    msg: "bien Login",
    user: {
      email,
      password,
    },
  });
};

export const renovateToken: RequestHandler = (req, res) => {
  res.json({
    ok: true,
    msg: "bien token",
  });
};
