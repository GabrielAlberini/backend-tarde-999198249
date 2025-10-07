import fs from "node:fs"
import express from "express"
import cors from "cors"

const PORT = 3000

const productos = JSON.parse(fs.readFileSync("./products.json", "utf-8"))

const app = express()
app.use(cors())
app.use(express.json())

// endpoint para comunicar el estado interno de la API
app.get("/", (request, response) => {
  response.json({ status: true })
})

// GET /productos - obtener los productos
app.get("/productos", (request, response) => {
  response.json(productos)
})

// GET -> http://localhost:3000/productos/2
app.get("/productos/:id", (request, response) => {
  const id = Number(request.params.id)

  const productoEncontrado = productos.find((producto) => producto.id === id)

  if (!productoEncontrado) {
    return response.status(404).json({ message: "Producto no encontrado" })
  }

  // el producto que encuentro en mi db producto de buscar mediante el ID
  response.status(200).json(productoEncontrado)
})

// POST -> http://localhost:3000/productos/ -> agregar un producto en la db
app.post("/productos", (request, response) => {
  const body = request.body

  const { nombre, descripcion, precio, categoria, stock } = body

  // validar schema / sanitizar los datos

  if (!nombre || !descripcion || !precio || !categoria || !stock) {
    return response.status(400).json({ message: "Datos invalidos" })
  }


  // validar existencia de producto en la base de datos
  // si existe -> returno -> 400 - bad request
  // si no existe lo agrego

  const nuevoProducto = {
    id: productos.length + 1,
    ...body
  }

  productos.push(nuevoProducto)

  fs.writeFileSync("./products.json", JSON.stringify(productos))

  response.json(nuevoProducto)
})

app.listen(PORT, () => {
  console.log(`Servidor en escucha en el puerto http://localhost:${PORT}`)
})