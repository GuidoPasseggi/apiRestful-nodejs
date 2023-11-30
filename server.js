import express from "express";
import RouterProductos from "./router/productos.js"; // con import (ES6 module) es requisito poner la extensión ".js"
import config from "./config.js";
import CnxMongoDB from "./model/MongoDB.js";

const app = express();
app.use(express.json()); // middleware para decodificar el body de envío JSON
app.use(express.urlencoded({ extended: true })); // middleware para envío de datos desde un formulario
// formato urlencoded:  nombre=memoria&precio=1234&stock=33

app.use(express.static("public"));
//^_ para poder visualizar el html del root (public/index.html es lo que busca por defecto)
//(OJO! los forms siempre emiten strings)

/* ---------------------------------------- */
//        API RESTful : Productos
/* ---------------------------------------- */

// FIXME: conectamos el router a la aplicacion de express, indicándole la ruta base donde trabajará:
app.use("/api/productos", new RouterProductos().start());

/* ---------------------------------------- */
//        LISTEN DEL SERVIDOR EXPRESS
/* ---------------------------------------- */
if (config.MODO_PERSISTENCIA === "MONGODB") {
  await CnxMongoDB.conectar(); // top-level await
}

const PORT = config.PORT;
const server = app.listen(PORT, () =>
  console.log(`Servidor express escuchando en http://localhost:${PORT}`)
);
server.on("error", (error) => console.log(`Error en servidor: ${error.message}`));
