import { MongoClient } from "mongodb";
import config from "../config.js";

class CnxMongoDB {
  static client = null;
  static connection = false;
  static db = null;

  static conectar = async () => {
    try {
      console.log("Conectando a la base de datos...");
      CnxMongoDB.client = new MongoClient(config.STRCNX); // este objeto me permitirá hacer una conexión de cliente:
      await CnxMongoDB.client.connect();
      console.log("Base de datos conectada!");
      CnxMongoDB.db = CnxMongoDB.client.db(config.BASE);
      CnxMongoDB.connection = true;
    } catch (error) {
      console.log(`Error en la conexión de base de datos: ${error.message}`);
    }
  };

  static desconectar = () => {
    // TODO:
  };
}

export default CnxMongoDB;
