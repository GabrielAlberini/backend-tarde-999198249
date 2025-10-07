import fs from "node:fs"
import express from "express"
import cors from "cors"

const PORT = 3000

const productos = JSON.parse(fs.readFileSync("./products.json", "utf-8"))

const app = express()
app.use(cors())

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

app.listen(PORT, () => {
  console.log(`Servidor en escucha en el puerto http://localhost:${PORT}`)
})