// MEM (async)

class ModelMemAsync {
  constructor() {
    this.productos = [
      { id: "1", nombre: "TV", precio: 1234.76, stock: 55 },
      { id: "2", nombre: "Mesa", precio: 234.32, stock: 23 },
      { id: "3", nombre: "Mouse", precio: 1122.54, stock: 456 },
    ];
  }

  obtenerProductos = async (id) => {
    if (id) {
      const producto = this.productos.find((producto) => producto.id === id);

      return producto || {};
    } else {
      return this.productos;
    }
  };

  guardarProducto = async (producto) => {
    producto.id = String(parseInt(this.productos[this.productos.length - 1]?.id || 0) + 1);
    producto.precio = Number(producto.precio);
    producto.stock = Number(producto.stock);
    this.productos.push(producto);
    return producto;
  };

  actualizarProducto = async (id, producto) => {
    producto.id = id;

    const index = this.productos.findIndex((producto) => producto.id === id);
    if (index != -1) {
      const productoAnterior = this.productos[index];
      const productoNuevo = { ...productoAnterior, ...producto };
      this.productos.splice(index, 1, productoNuevo);
      return productoNuevo;
    } else {
      this.productos.push(producto);
      return producto;
    }
  };

  borrarProducto = async (id) => {
    let producto = {};

    const index = this.productos.findIndex((producto) => producto.id === id);
    if (index != -1) {
      producto = this.productos.splice(index, 1)[0];
    }
    return producto;
  };
}

export default ModelMemAsync;
