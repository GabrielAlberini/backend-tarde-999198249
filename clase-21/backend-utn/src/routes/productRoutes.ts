// EL ROUTER VALIDA METODOS Y RUTAS PROPIAS DE LA ENTIDAD

// GET http://localhost:3000/product

import { Router } from "express"
import ProductController from "../controllers/productController"

const productRouter = Router()

// TODAS LAS PETICIONES QUE LLEGAN AL PRODUCTROUTER EMPIEZAN CON
// http://localhost:3000/products

productRouter.get("/", ProductController.getAllProducts)
productRouter.get("/:id", ProductController.getProduct)
productRouter.post("/", ProductController.addProduct)
productRouter.patch("/:id", ProductController.updateProduct)
productRouter.delete("/:id", ProductController.deleteProduct)

export default productRouter