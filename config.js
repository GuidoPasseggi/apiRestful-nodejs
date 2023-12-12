import dotenv from "dotenv";

dotenv.config(); // reads file .env keys and send it to process.env of NODE.JS

const PORT = process.env.PORT || 8080;
const MODO_PERSISTENCIA = process.env.MODO_PERSISTENCIA || "MEM";
// STRCNX <--- "connection string"
const STRCNX = process.env.STRCNX || "mongodb://127.0.0.1:27017"; // 27017 es el puerto default de mongo, podríamos omitirlo
const BASE = process.env.BASE || "test";

export default {
  PORT,
  MODO_PERSISTENCIA,
  STRCNX,
  BASE,
};
