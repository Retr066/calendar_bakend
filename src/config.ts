import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  DB_USER: process.env.DB_USER || "retr0",
  DB_PASSWORD: process.env.DB_PASSWORD || "test",
  SECRET_JWT_SEED: process.env.SECRET_JWT_SEED || "Retr0_es_el_puto_amo@_6661456",
};
