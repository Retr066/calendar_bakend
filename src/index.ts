import express from "express";
import router from "./routes/auth";
import { default as routerEvents } from "./routes/event";
import config from "./config";
import morgan from "morgan";
import cors from "cors";
import { dbConnection } from "./database/config";
const app = express();

app.use(express.static("public"));

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/auth", router);
app.use("/api/events", routerEvents);
app.listen(config.PORT, () => {
  console.log(`Express corriendo en el puerto ${config.PORT}`);
});
dbConnection();
