import express, { Request, Response } from "express"
import { connect, Schema, model, Model, Types } from "mongoose"
import cors from "cors"

const PORT = 3000
const URI_DB = "mongodb://localhost:27017/db_utn_backend"

const connectDB = async () => {
  try {
    await connect(URI_DB)
    console.log("✅ Conectado a Mongo DB con éxito!")
  } catch (e) {
    console.log("❌ Error al conectarse a Mongo DB")
    process.exit(1)
  }
}

const app = express()
app.use(cors())
app.use(express.json())

interface IProduct {
  name: string,
  description: string,
  stock: number,
  category: string
  price: number
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, default: "No tiene descripción" },
  stock: { type: Number, default: 0, min: 0 },
  category: { type: String, default: "No tiene categoria" },
  price: { type: Number, default: 0, min: 0 }
}, {
  versionKey: false
})

const Product: Model<IProduct> = model("Product", productSchema)

// endpoint para comunicar el estado interno de la API
app.get("/", (request: Request, response: Response) => {
  response.json({ status: true })
})

// GET /productos - obtener los productos
app.get("/products", async (request: Request, response: Response): Promise<void> => {
  try {
    const products = await Product.find()
    response.json(products)
  } catch (e) {
    const error = e as Error
    response.status(500).json({ error: error.message })
  }
}
)

// GET -> http://localhost:3000/productos/2
app.get("/products/:id", async (request: Request, response: Response): Promise<void | Response> => {
  try {
    const id = request.params.id

    if (!Types.ObjectId.isValid(id)) {
      return response.status(400).json({ error: "ID Inválido" });
    }

    // if (1 > 0) {
    //   throw new Error("Se cayo internet :(")
    // }

    const product = await Product.findById(id)

    if (!product) {
      return response.status(404).json({ error: "Producto no encontrado" })
    }

    // el producto que encuentro en mi db producto de buscar mediante el ID
    response.status(200).json(product)
  } catch (e) {
    const error = e as Error
    response.status(500).json({ error: error.message })
  }
})

// POST -> http://localhost:3000/productos/ -> agregar un producto en la db
app.post("/products", async (request: Request, response: Response): Promise<void | Response> => {
  try {
    const body = request.body

    const { name, description, price, category, stock } = body

    if (!name || !description || !price || !category || !stock) {
      return response.status(400).json({ message: "Datos invalidos" })
    }

    const newProduct = new Product({ name, description, price, category, stock })

    await newProduct.save()
    response.status(201).json(newProduct)
  } catch (e) {
    const error = e as Error
    response.status(500).json({ error: error.message })
  }
})

// REQ -> DELETE /productos/1 -> borrar un producto con id 1
app.delete("/products/:id", async (request: Request, response: Response): Promise<void | Response> => {
  try {
    const id = request.params.id

    if (!Types.ObjectId.isValid(id)) {
      return response.status(400).json({ error: "ID Inválido" });
    }

    const product = await Product.findByIdAndDelete(id)

    response.json(product)
  } catch (e) {
    const error = e as Error
    response.status(500).json({ error: error.message })
  }
})

// REQ -> PATCH /productos/1 -> actulizar los datos del producto con id 1
app.patch("/products/:id", async (request: Request, response: Response): Promise<void | Response> => {
  try {
    const id = request.params.id
    const body = request.body

    if (!Types.ObjectId.isValid(id)) response.status(400).json({ error: "ID Inválido" })

    const { name, description, price, category, stock } = body

    const updates = { name, description, price, category, stock }

    const product = await Product.findByIdAndUpdate(id, updates, { new: true })

    if (!product) {
      return response.status(404).json({ error: "Producto no encontrado" })
    }

    response.json(product)
  } catch (e) {
    const error = e as Error
    response.status(500).json({ error: error.message })
  }
})

app.use("", (request, response) => {
  response.status(404).json({ error: "El recurso no se encuentra" })
})

app.listen(PORT, () => {
  console.log(`Servidor en escucha en el puerto http://localhost:${PORT}`)
  connectDB()
})