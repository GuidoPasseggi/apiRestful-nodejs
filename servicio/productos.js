// le ponemos a las funcionas las funciones que hicimos en el controlador
// el SERVICIO no sabe que usamos express (por ej.), éso lo hacemos desde el CONTROLADOR
// TODO: este SERVICIO en particular no hace mas que delegar, pero por ej. si hubiera que hacer un cálculo (conversion USD a PESOS por ej.) el responsable sería el SERVICIO (y el modelo solo agarra la data de la DB)

/* // FIXME: distintas opciones de persistencia de datos, antes de implementar la factory DAO (data access object) de elección dinámica de tipo de persistencia de datos.
//es elegir uno u otro (tamb en el constructor) :
// import ModelMem from "../model/productosMem.js"; // productos en memoria del server (al reiniciar el server, los datos se pierden, y toma los hardcodeados en productosMem.js)
// import ModelMem from "../model/productosMemAsync.js"; // productos en memoria del server pero ASYNC
// import ModelFile from "../model/productosFile.js"; // productos con PERSISTENCIA en memoria (fileSystem) pero SINCRÓNICO
// import ModelFile from "../model/productosFileAsync.js"; // productos con PERSISTENCIA en memoria (fileSystem) pero ASYNC asincrónico */
import config from "../config.js";
import ModelFactory from "../model/DAO/productosFactory.js";
import { validar } from "../validaciones/productos.js";

class Servicio {
  constructor() {
    /* // FIXME: tamb es elegir uno u otro (persistencia de datos). Antes de implementar la factory de elección dinámica de persistencia de datos:
    // this.model = new ModelMem();
    // this.model = new ModelFile();  */
    this.model = ModelFactory.get(config.MODO_PERSISTENCIA); // <--- no hace falta el "new" para instanciar la clase
  }

  obtenerProductos = async (id) => {
    const productos = await this.model.obtenerProductos(id);
    return productos;
  };

  calculoProductos = async (tipo) => {
    let resultado = "calculo no soportado";
    switch (tipo) {
      case "promedio-precios":
        const productos = await this.model.obtenerProductos();
        const sumatoria = productos.reduce(
          (acumulador, producto) => acumulador + producto.precio,
          0
        );
        const promedio = sumatoria / productos.length;
        resultado = Number(promedio.toFixed(2));
        break;

      default:
        break;
    }
    return { [tipo]: resultado }; // [tipo] es un key variable para que el key sea realmente el tipo (variable) y no un texto que diga "tipo"
  };

  guardarProducto = async (producto) => {
    const res = validar(producto);
    if (res.result) {
      const productoGuardado = await this.model.guardarProducto(producto);
      return productoGuardado;
    } else {
      console.log(res.error);
      throw res.error;
    }
  };

  actualizarProducto = async (id, producto) => {
    const productoActualizado = await this.model.actualizarProducto(id, producto);
    return productoActualizado;
  };

  borrarProducto = async (id) => {
    const productoBorrado = await this.model.borrarProducto(id);
    return productoBorrado;
  };
}

export default Servicio;
