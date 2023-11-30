import express from "express";
import Controlador from "../controlador/productos.js";

/* ---------------------------------------- */
/*        API Restful : Productos           */
/* ---------------------------------------- */

class Router {
  constructor() {
    this.router = express.Router(); // es como un mini express acotado p/rutas, se usa en vez de "app.get" etc (router.get)
    this.controlador = new Controlador();
  }

  // FIXME: si bien actualmente controlador/servicio/modelo trabajan de modo ASYNCrónico, el router de express puede trabajar los callbacks (this.controlador.obtenerProductos) tanto sincrónicamente como asincrónicamente (y son CALLBACKS "funcion", no ejecuciones "funcion()"") ergo no es necesario acá implementar async/await
  start() {
    this.router.get("/:id?", this.controlador.obtenerProductos);
    this.router.get("/calculo/:tipo", this.controlador.calculoProductos);
    this.router.post("/", this.controlador.guardarProducto);
    this.router.put("/:id", this.controlador.actualizarProducto);
    this.router.delete("/:id", this.controlador.borrarProducto);

    return this.router;
  }
}

export default Router;

/////// codigo viejo de una sola ruta, antes de implementar controlador:
/* // // --------- PUT (actualización TOTAL, antes de sacar el callback "req,res" de "/controlador/productos.js") ----------
// router.put("/:id", (req, res) => {
//   const { id } = req.params;
//   const producto = req.body;
//   producto.id = id;

//   const index = productos.findIndex((producto) => producto.id === id);
//   if (index != -1) {
//     productos.splice(index, 1, producto);
//   } else {
//     productos.push(producto);
//   }
//   res.json(producto);
// }); */
