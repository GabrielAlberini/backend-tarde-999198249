// importar herramientas / bibliotecas
import express, { NextFunction, Request, Response } from "express"
import { connect, Schema, model, Model, Types } from "mongoose"
import bcrypt from "bcryptjs"
import cors from "cors"
import jwt from "jsonwebtoken"

declare global {
  namespace Express {
    interface Request {
      user?: any
    }
  }
}

// credenciales
const PORT = 3000
const URI_DB = "mongodb://localhost:27017/db_utn_backend"
const SECRET_KEY = "clave_secreta"

// función que conecta la db
const connectDB = async () => {
  try {
    await connect(URI_DB)
    console.log("✅ Conectado a Mongo DB con éxito!")
  } catch (e) {
    console.log("❌ Error al conectarse a Mongo DB")
    process.exit(1)
  }
}

// creación del servidor
// habilitando cors -> el front pueda consumir la API
// habilitando el req.body -> el front pueda enviar un json al servidor
const app = express()

// middleware
app.use(cors())
app.use(express.json())

// creando un contranto del producto
// controla que cada producto tenga la esctructura definida
interface IProduct {
  name: string,
  description: string,
  stock: number,
  category: string
  price: number
}

interface IUser {
  email: string,
  password: string
}

// creanción de schema para mongodb
// controla las propiedades que tendrá cada dato a futuro
const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, default: "No tiene descripción" },
  stock: { type: Number, default: 0, min: 0 },
  category: { type: String, default: "No tiene categoria" },
  price: { type: Number, default: 0, min: 0 }
}, {
  versionKey: false
})

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
  versionKey: false
})

// creando el modelo
// crea la collección en mongodb -> Product -> products
const Product: Model<IProduct> = model("Product", productSchema)
const User: Model<IUser> = model("User", userSchema)

const authMiddleware = (request: Request, response: Response, next: NextFunction) => {
  const header = request.headers.authorization

  if (!header) {
    return response.status(401).json({ error: "El token es requerido" })
  }

  const token = header.split(" ")[1]

  try {
    // payload
    const logginUser = jwt.verify(token, SECRET_KEY);

    (request as any).user = logginUser

    next()
  } catch (e) {
    const error = e as Error
    response.status(401).json({ error: error.message })
  }
}

// cración de endpoints
// rutas posibles del front para comunicar que es lo que se quiere manejar y que acción
// se hará sobre esta entidad
app.get("/", (request: Request, response: Response) => {
  response.json({ status: true })
})

// obtener productos
app.get("/products", authMiddleware, async (request: Request, response: Response): Promise<void | Response> => {
  try {
    const products = await Product.find()
    response.json(products)
  } catch (e) {
    const error = e as Error
    response.status(500).json({ error: error.message })
  }
}
)

app.get("/products/:id", authMiddleware, async (request: Request, response: Response): Promise<void | Response> => {
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

app.post("/products", authMiddleware, async (request: Request, response: Response): Promise<void | Response> => {
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

app.delete("/products/:id", authMiddleware, async (request: Request, response: Response): Promise<void | Response> => {
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

app.patch("/products/:id", authMiddleware, async (request: Request, response: Response): Promise<void | Response> => {
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

app.post("/auth/register", async (request: Request, response: Response): Promise<void | Response> => {
  try {
    const { email, password } = request.body

    if (!email || !password) {
      return response.status(400).json({ message: "Datos invalidos" })
    }

    // crear el hash de la contraseña
    const hash = await bcrypt.hash(password, 10)
    const newUser = new User({ email, password: hash })

    await newUser.save()
    response.json(newUser)
  } catch (e) {
    const error = e as Error
    switch (error.name) {
      case "MongoServerError":
        return response.status(409).json({ message: "Usuario ya existente en nuestra base de datos" })
    }
  }
})

app.post("/auth/login", async (request: Request, response: Response): Promise<void | Response> => {
  try {
    const { email, password } = request.body

    if (!email || !password) {
      return response.status(400).json({ error: "Datos invalidos" })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return response.status(401).json({ error: "No autorizado" })
    }

    // validar la contraseña
    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      return response.status(401).json({ error: "No autorizado" })
    }

    // ✅ permiso especial -> sesión de uso
    // jsonwebtoken -> jwt

    // jwt.sign
    // 1 - payload -> información pública que quiero compartir del usuario logeado
    // 2 - clave secreta -> firma que valida el token
    // 3 - opciones -> cuando expira

    const token = jwt.sign({ id: user._id, test: "pepe" }, SECRET_KEY, { expiresIn: "1h" })
    response.json({ token })
  } catch (e) {
    const error = e as Error
    response.status(500).json({ error: error.message })
  }
})

// endpoint para el 404 - no se encuentra el recurso
app.use((request, response) => {
  response.status(404).json({ error: "El recurso no se encuentra" })
})

// servidor en escucha
app.listen(PORT, () => {
  console.log(`Servidor en escucha en el puerto http://localhost:${PORT}`)
  connectDB()
})