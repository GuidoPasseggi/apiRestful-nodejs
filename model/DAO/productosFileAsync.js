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
      //TODO: por ahora vacío
    }
    return productos;
  };

  escribirArchivo = async (nombre, productos) => {
    await fs.promises.writeFile(nombre, JSON.stringify(productos, null, "\t"));
    // ^_ JSON.stringify(productos,null,"\t") <--- tanto "null" como "\t" es opcional, para que al guardar el "productos.json" respete tabulaciones etc. Es solo estético
  };

  obtenerProductos = async (id) => {
    try {
      const productos = await this.leerArchivo(this.nombreArchivo);
      if (id) {
        const producto = productos.find((producto) => producto.id === id); // <--- esto NO es responsabilidad del servicio en realidad (es de la capa del MODELO que aún no está implementada)
        // console.log(producto); // TODO: usar metodo .find

        return producto || {}; // TODO: si no existe el id, devuelve objeto vacío <--- "||"" short circuit operator
      } else {
        return productos;
      }
    } catch {
      return id ? {} : [];
    }
  };

  guardarProducto = async (producto) => {
    const productos = await this.leerArchivo(this.nombreArchivo);

    // FIXME: crear el id (notar que se pasa a num para sumarlo y luego a string. tambien notar el optional "?" (optional chaining) y el || 0 (short circuit operator)
    producto.id = String(parseInt(productos[productos.length - 1]?.id || 0) + 1); // ?. optional chaining
    producto.precio = Number(producto.precio);
    producto.stock = Number(producto.stock);
    productos.push(producto);
    await this.escribirArchivo(this.nombreArchivo, productos); // persistencia en memoria (fs fileSystem)
    return producto;
  };

  actualizarProducto = async (id, producto) => {
    const productos = await this.leerArchivo(this.nombreArchivo);
    producto.id = id;

    const index = productos.findIndex((producto) => producto.id === id);
    if (index != -1) {
      const productoAnterior = productos[index];
      const productoNuevo = { ...productoAnterior, ...producto }; // FIXME: spread operator + object merge (nota GUIDO: funciona porque es un objeto entonces los datos se actualizan por el key <--- OBJECT MERGE)
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
