///////////////// MODEL //////////////
// productos con  PERSISTENCIA EN MEMORIA

// FIXME: ESTE YA NO VA! tampoco lo utilizamos en la factory DAO del model
// porque está todo sincrónico y el resto del server está async

class ModelMem {
  constructor() {
    // FIXME: evitar usar ID 0
    this.productos = [
      { id: "1", nombre: "TV", precio: 1234.76, stock: 55 },
      { id: "2", nombre: "Mesa", precio: 234.32, stock: 23 },
      { id: "3", nombre: "Mouse", precio: 1122.54, stock: 456 },
    ];
  }

  obtenerProductos = (id) => {
    if (id) {
      const producto = this.productos.find((producto) => producto.id === id); // <--- esto NO es responsabilidad del servicio en realidad (es de la capa del MODELO que aún no está implementada)
      // console.log(producto); // TODO: usar metodo .find

      return producto || {}; // TODO: si no existe el id, devuelve objeto vacío <--- "||"" short circuit operator
    } else {
      return this.productos;
    }
  };

  guardarProducto = (producto) => {
    // FIXME: crear el id (notar que se pasa a num para sumarlo y luego a string. tambien notar el optional "?" (optional chaining) y el || 0 (short circuit operator)
    producto.id = String(parseInt(this.productos[this.productos.length - 1]?.id || 0) + 1); // ?. optional chaining
    producto.precio = Number(producto.precio);
    producto.stock = Number(producto.stock);
    this.productos.push(producto);
    return producto;
  };

  actualizarProducto = (id, producto) => {
    producto.id = id;

    const index = this.productos.findIndex((producto) => producto.id === id);
    if (index != -1) {
      const productoAnterior = this.productos[index];
      const productoNuevo = { ...productoAnterior, ...producto }; // FIXME: spread operator + object merge (nota GUIDO: funciona porque es un objeto entonces los datos se actualizan por el key <--- OBJECT MERGE)
      this.productos.splice(index, 1, productoNuevo);
      return productoNuevo;
    } else {
      this.productos.push(producto);
      return producto;
    }
  };

  borrarProducto = (id) => {
    let producto = {};

    const index = this.productos.findIndex((producto) => producto.id === id);
    if (index != -1) {
      producto = this.productos.splice(index, 1)[0];
    }
    return producto;
  };
}

export default ModelMem;
