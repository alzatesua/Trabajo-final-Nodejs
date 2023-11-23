const express = require('express');//variable asignado a express
const bodyParser = require('body-parser');//variable asignada a body-parser
const app = express();//igualacion de la variable app el metodo express
const port = 3000;//creamos una variable con el puerto en este caso 300 de 
                  //localhost


const productos = [];//creamos un arry para almacenar los productos
app.use(bodyParser.json());// Configura el  body-parser 
  //para analizar solicitudes en formato JSON

// Ruta para obtener todos los productos
app.get('/productos', (req, res) => {
  res.json(productos);// Devuelve la lista de productos en formato JSON
});

// Ruta para obtener un producto por su ID
app.get('/productos/:id', (req, res) => {
  const id = req.params.id;// Obtiene el ID de los parámetros de la URL

  // Busca el producto en el array por ID
  const producto = productos.find(p => p.id === parseInt(id));


  if (producto) {//si el producto se encuentra
    res.json(producto);//debuelve el producto en formato JSON
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });//debuelve error
  }
});

// Ruta para crear un nuevo producto
app.post('/productos/agregar', (req, res) => {
  const nuevoProducto = req.body; // Obtiene el nuevo producto del cuerpo de la solicitud
  nuevoProducto.id = productos.length + 1; // Asigna un ID al nuevo producto
  productos.push(nuevoProducto); // Agrega el nuevo producto al array de productos
  res.status(201).json(nuevoProducto); // Devuelve el nuevo producto y un código de estado 201
});

// Ruta para actualizar un producto por su ID
app.put('/productos/buscar/:id', (req, res) => {
  const id = req.params.id; // Obtiene el ID de los parámetros de la URL

  // Encuentra el índice del producto en el array por ID
  const productoIndex = productos.findIndex(p => p.id === parseInt(id)); 

  if (productoIndex !== -1) {
    // Actualiza el producto con los datos de la solicitud
    productos[productoIndex] = { ...productos[productoIndex], ...req.body }; 
    res.json(productos[productoIndex]); // Devuelve el producto actualizado en formato JSON
  } else {
    // Devuelve un mensaje de error si el producto no se encuentra
    res.status(404).json({ message: 'Producto no encontrado' }); 
  }
});

// Ruta para eliminar un producto por su ID
app.delete('/productos/eliminar/:id', (req, res) => {
  const id = req.params.id; // Obtiene el ID de los parámetros de la URL
  // Encuentra el índice del producto en el array por ID
  const productoIndex = productos.findIndex(p => p.id === parseInt(id)); 

  if (productoIndex !== -1) {
    // Elimina el producto del array y obtiene el producto eliminado
    const productoEliminado = productos.splice(productoIndex, 1); 
    res.json(productoEliminado[0]); // Devuelve el producto eliminado en formato JSON
  } else {
    // Devuelve un mensaje de error si el producto no se encuentra
    res.status(404).json({ message: 'Producto no encontrado' }); 
  }
});

// Inicia el servidor y escucha en el puerto especificado
app.listen(port, () => {
  console.log(`El programa del servidor se inicio correctamente`);
});