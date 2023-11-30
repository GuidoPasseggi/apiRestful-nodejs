import dotenv from "dotenv";

dotenv.config(); // lee el archivo .env y agarre las claves, y las ponga en el process.env de NODE

const PORT = process.env.PORT || 8080;
const MODO_PERSISTENCIA = process.env.MODO_PERSISTENCIA || "MEM";
// STRCNX <--- "string de conexión"
const STRCNX = process.env.STRCNX || "mongodb://127.0.0.1:27017"; // 27017 es el puerto default de mongo, podríamos omitirlo
const BASE = process.env.BASE || "test";

export default {
  PORT,
  MODO_PERSISTENCIA,
  STRCNX,
  BASE,
};
