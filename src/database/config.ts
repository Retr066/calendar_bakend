import mongoose from "mongoose";
import config from "../config";

export const dbConnection = async () => {
  try {
    const uri = `mongodb+srv://${config.DB_USER}:${config.DB_PASSWORD}@cluster0.xolvq.mongodb.net/dbCalendar?retryWrites=true&w=majority`;
    await mongoose.connect(uri);
    console.log("DB Conectado satisfactoriamente");
  } catch (error) {
    console.error(error);

    throw new Error("Error al inicializar la base de datos");
  }
};
