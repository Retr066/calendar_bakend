import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { generarJWT } from "../utils/jwt";
export const createUser: RequestHandler = async (req, res) => {
  try {
    const { password } = req.body;
    const user = new User(req.body);
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    await user.save();
    const token = await generarJWT(user.id, user.fullName);
    res.status(201).json({
      ok: true,
      msg: "Usuario creado correctamente",
      uid: user.id,
      fullName: user.fullName,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Algo salio mal",
    });
  }
};

export const Login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user?.id);
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario no existe con ese email",
      });
    }
    const validPassword: boolean = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password Incorrecto",
      });
    }
    const token = await generarJWT(user.id, user.fullName);
    res.status(200).json({
      ok: true,
      msg: "Logueado Satisfactoriamente",
      uid: user.id,
      fullName: user.fullName,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Algo salio mal",
    });
  }
};

export const renovateToken: RequestHandler = async (req, res) => {
  const uid = req.body.uid;
  const fullName = req.body.fullName;

  const token = await generarJWT(uid, fullName);
  res.json({
    ok: true,
    msg: "token renovado",
    token,
  });
};
