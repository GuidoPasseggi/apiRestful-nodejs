// TODO: CONTROLADOR tiene la responsabilidad de:
// - tiene acceso al objeto de req, la entrada de datos del cliente
// - con res le responde al cliente
// - todo el resto lo debe realizar el servicio

import Servicio from "../servicio/productos.js";

class Controlador {
  constructor() {
    this.servicio = new Servicio();
  }
  obtenerProductos = async (req, res) => {
    const { id } = req.params;
    // console.log(id);
    const productos = await this.servicio.obtenerProductos(id);
    res.json(productos);
  };

  calculoProductos = async (req, res) => {
    const { tipo } = req.params;
    const resultado = await this.servicio.calculoProductos(tipo);
    res.json(resultado);
  };

  guardarProducto = async (req, res) => {
    try {
      const producto = req.body;
      const productoGuardado = await this.servicio.guardarProducto(producto);
      res.json(productoGuardado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // --------- PUT (actualización PARCIAL ) ----------
  actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const producto = req.body;
    const productoActualizado = await this.servicio.actualizarProducto(id, producto);
    res.json(productoActualizado);
  };

  // delete en gral devuelve el objeto borrado (u objeto vacio)
  borrarProducto = async (req, res) => {
    const { id } = req.params;
    const productoBorrado = await this.servicio.borrarProducto(id);
    res.json(productoBorrado);
  };
}

export default Controlador;
