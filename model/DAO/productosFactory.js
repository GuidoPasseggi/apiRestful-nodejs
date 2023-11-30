import ModelMemAsync from "./productosMemAsync.js";
import ModelFileAsync from "./productosFileAsync.js";
import ModelMongoDB from "./productosMongoDB.js";

class ModelFactory {
  static get(tipo) {
    switch (tipo) {
      case "MEM-ASYNC":
        console.log(`**** Persistiendo en Memoria (ASYNCrónico) ****`);
        return new ModelMemAsync();
      case "FILE-ASYNC":
        console.log(`**** Persistiendo en FileSystem (ASYNCrónico) ****`);
        return new ModelFileAsync();
      case "MONGODB":
        console.log(`**** Persistiendo en MongoDB (ASYNCrónico) ****`);
        return new ModelMongoDB();
      default:
        console.log(`**** Persistiendo en Memoria (default) ****`);
        return new ModelMemAsync();
    }
  }
}

export default ModelFactory;
