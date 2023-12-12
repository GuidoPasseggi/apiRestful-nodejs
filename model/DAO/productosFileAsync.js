///////////////// MODEL //////////////
// productos con  PERSISTENCIA EN FS (fileSystem)

import fs from "fs";

class ModelFileAsync {
  constructor() {
    this.nombreArchivo = "productos.json";
  }

  leerArchivo = async (nombre) => {
    let productos = [];
    try {
      productos = JSON.parse(await fs.promises.readFile(nombre, "utf-8"));
    } catch {
      //TODO:
    }
    return productos;
  };

  escribirArchivo = async (nombre, productos) => {
    await fs.promises.writeFile(nombre, JSON.stringify(productos, null, "\t")); // "\t" respects tabulation
  };

  obtenerProductos = async (id) => {
    try {
      const productos = await this.leerArchivo(this.nombreArchivo);
      if (id) {
        const producto = productos.find((producto) => producto.id === id);
        return producto || {};
      } else {
        return productos;
      }
    } catch {
      return id ? {} : [];
    }
  };

  guardarProducto = async (producto) => {
    const productos = await this.leerArchivo(this.nombreArchivo);

    producto.id = String(parseInt(productos[productos.length - 1]?.id || 0) + 1);
    producto.precio = Number(producto.precio);
    producto.stock = Number(producto.stock);
    productos.push(producto);
    await this.escribirArchivo(this.nombreArchivo, productos);
    return producto;
  };

  actualizarProducto = async (id, producto) => {
    const productos = await this.leerArchivo(this.nombreArchivo);
    producto.id = id;

    const index = productos.findIndex((producto) => producto.id === id);
    if (index != -1) {
      const productoAnterior = productos[index];
      const productoNuevo = { ...productoAnterior, ...producto };
      productos.splice(index, 1, productoNuevo);
      await this.escribirArchivo(this.nombreArchivo, productos);
      return productoNuevo;
    } else {
      productos.push(producto);
      await this.escribirArchivo(this.nombreArchivo, productos);
      return producto;
    }
  };

  borrarProducto = async (id) => {
    let producto = {};
    const productos = await this.leerArchivo(this.nombreArchivo);

    const index = productos.findIndex((producto) => producto.id === id);
    if (index != -1) {
      producto = productos.splice(index, 1)[0];
      await this.escribirArchivo(this.nombreArchivo, productos);
    }
    return producto;
  };
}

export default ModelFileAsync;
