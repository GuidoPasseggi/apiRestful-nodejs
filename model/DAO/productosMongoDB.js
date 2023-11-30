///////////////// MODEL //////////////
// productos con  PERSISTENCIA EN MONGODB

import { ObjectId } from "mongodb";
import CnxMongoDB from "../MongoDB.js";

class ModelMongoDB {
  obtenerProductos = async (id) => {
    if (!CnxMongoDB.connection) return id ? {} : []; // tamb podríamos indicar que la DB no está conectada
    if (id) {
      const producto = await CnxMongoDB.db
        .collection("productos")
        .findOne({ _id: new ObjectId(id) });
      return producto;
    } else {
      const productos = await CnxMongoDB.db.collection("productos").find({}).toArray(); // devuelve un CURSOR (obj que colecciona documentos), lo pasamos a ARRAY de objetos
      return productos;
    }
  };

  guardarProducto = async (producto) => {
    if (!CnxMongoDB.connection) return {};
    await CnxMongoDB.db.collection("productos").insertOne(producto); // insertOne le inserta el _id al producto automáticamente
    return producto;
  }; //FIXME: FALTA HACER QUE LOS DATOS CARGADOS DESDE EL FORMULARIO SEAN NUMBER SEGUN CORRESPONDA

  actualizarProducto = async (id, producto) => {
    if (!CnxMongoDB.connection) return {};
    await CnxMongoDB.db
      .collection("productos")
      .updateOne({ _id: new ObjectId(id) }, { $set: producto });
    const productoActualizado = await this.obtenerProductos(id);
    return productoActualizado;
  };

  borrarProducto = async (id) => {
    if (!CnxMongoDB.connection) return {};
    const productoBorrado = await this.obtenerProductos(id);
    await CnxMongoDB.db.collection("productos").deleteOne({ _id: new ObjectId(id) });
    return productoBorrado;
  };
}

export default ModelMongoDB;
