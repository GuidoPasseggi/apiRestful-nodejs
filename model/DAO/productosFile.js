///////////////// MODEL //////////////
// productos con  PERSISTENCIA EN FS (fileSystem)

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
      //TODO: por ahora vacío
    }
    return productos;
  };

  escribirArchivo = (nombre, productos) => {
    fs.writeFileSync(nombre, JSON.stringify(productos, null, "\t"));
    // ^_ JSON.stringify(productos,null,"\t") <--- tanto "null" como "\t" es opcional, para que al guardar el "productos.json" respete tabulaciones etc. Es solo estético
  };

  obtenerProductos = (id) => {
    try {
      const productos = this.leerArchivo(this.nombreArchivo);
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

  guardarProducto = (producto) => {
    const productos = this.leerArchivo(this.nombreArchivo);

    // FIXME: crear el id (notar que se pasa a num para sumarlo y luego a string. tambien notar el optional "?" (optional chaining) y el || 0 (short circuit operator)
    producto.id = String(parseInt(productos[productos.length - 1]?.id || 0) + 1); // ?. optional chaining
    producto.precio = Number(producto.precio);
    producto.stock = Number(producto.stock);
    productos.push(producto);
    this.escribirArchivo(this.nombreArchivo, productos); // persistencia en memoria (fs fileSystem)
    return producto;
  };

  actualizarProducto = (id, producto) => {
    const productos = this.leerArchivo(this.nombreArchivo);
    producto.id = id;

    const index = productos.findIndex((producto) => producto.id === id);
    if (index != -1) {
      const productoAnterior = productos[index];
      const productoNuevo = { ...productoAnterior, ...producto }; // FIXME: spread operator + object merge (nota GUIDO: funciona porque es un objeto entonces los datos se actualizan por el key <--- OBJECT MERGE)
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
