import fs from "node:fs"
import http from "node:http" // HyperText Transfer Protocol

// 65000
const PORT = 3000

const products = fs.readFileSync("./products.json", "utf-8")

const server = http.createServer((request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500")

  if (request.url === "/productos" && request.method === "GET") {
    // obtener los productos
    // peticion a mongodb mediante mongoose de trar los productos Product.find()
    response.writeHead(200, { "Content-Type": "application/json" })
    response.end(products)
  } else if (request.url === "/productos" && request.method === "POST") {
    // agregar producto
    // peticion a mongodb mediante mongoose agregar un producto new Product()
  } else {
    response.writeHead(404, { "Content-Type": "application/json" })
    response.end(JSON.stringify({ status: "el recurso no se encuentra" }))
  }
})

server.listen(PORT, () => {
  console.log(`Servidor en escucha en el puerto http://localhost:${PORT}`)
})