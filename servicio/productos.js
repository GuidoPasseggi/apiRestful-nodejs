import config from "../config.js";
import ModelFactory from "../model/DAO/productosFactory.js";
import { validar } from "../validaciones/productos.js";

class Servicio {
  constructor() {
    this.model = ModelFactory.get(config.MODO_PERSISTENCIA);
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
    return { [tipo]: resultado }; // [tipo] it's a variable key
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
