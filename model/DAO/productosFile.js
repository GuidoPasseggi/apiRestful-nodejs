// fileSystem

import fs from "fs";

class ModelFile {
  constructor() {
    this.nombreArchivo = "productos.json";
  }

  leerArchivo = (nombre) => {
    let productos = [];
    try {
      productos = JSON.parse(fs.readFileSync(nombre, "utf-8"));
    } catch {
      //TODO:
    }
    return productos;
  };

  escribirArchivo = (nombre, productos) => {
    fs.writeFileSync(nombre, JSON.stringify(productos, null, "\t")); // "\t" respects tabulation
  };

  obtenerProductos = (id) => {
    try {
      const productos = this.leerArchivo(this.nombreArchivo);
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

  guardarProducto = (producto) => {
    const productos = this.leerArchivo(this.nombreArchivo);

    producto.id = String(parseInt(productos[productos.length - 1]?.id || 0) + 1);
    producto.precio = Number(producto.precio);
    producto.stock = Number(producto.stock);
    productos.push(producto);
    this.escribirArchivo(this.nombreArchivo, productos);
    return producto;
  };

  actualizarProducto = (id, producto) => {
    const productos = this.leerArchivo(this.nombreArchivo);
    producto.id = id;

    const index = productos.findIndex((producto) => producto.id === id);
    if (index != -1) {
      const productoAnterior = productos[index];
      const productoNuevo = { ...productoAnterior, ...producto };
      productos.splice(index, 1, productoNuevo);
      this.escribirArchivo(this.nombreArchivo, productos);
      return productoNuevo;
    } else {
      productos.push(producto);
      this.escribirArchivo(this.nombreArchivo, productos);
      return producto;
    }
  };

  borrarProducto = (id) => {
    let producto = {};
    const productos = this.leerArchivo(this.nombreArchivo);

    const index = productos.findIndex((producto) => producto.id === id);
    if (index != -1) {
      producto = productos.splice(index, 1)[0];
      this.escribirArchivo(this.nombreArchivo, productos);
    }
    return producto;
  };
}

export default ModelFile;
