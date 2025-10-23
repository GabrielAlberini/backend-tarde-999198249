// LEVANTAR NUESTRO SERIVICIO Y CONFIGURACIONES GLOBALES

// importar herramientas / bibliotecas
import express, { Request, Response } from "express"
import { Schema, model, Model } from "mongoose"
import bcrypt from "bcryptjs"
import cors from "cors"
import jwt from "jsonwebtoken"
import IUser from "./interfaces/IUser"
import connectDB from "./config/mongodb"
import productRouter from "./routes/productRoutes"
import authMiddleware from "./middleware/authMiddleware"

declare global {
  namespace Express {
    interface Request {
      user?: any
    }
  }
}

const PORT = 3000
const SECRET_KEY = "msdjlkfnhasjlkdfasdf"

const app = express()

app.use(cors())
app.use(express.json())

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
  versionKey: false
})

const User: Model<IUser> = model("User", userSchema)

app.get("/", (request: Request, response: Response) => {
  response.json({ status: true })
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

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" })
    response.json({ token })
  } catch (e) {
    const error = e as Error
    response.status(500).json({ error: error.message })
  }
})

app.use("/products", authMiddleware, productRouter)

// endpoint para el 404 - no se encuentra el recurso
app.use((request, response) => {
  response.status(404).json({ error: "El recurso no se encuentra" })
})

// servidor en escucha
app.listen(PORT, () => {
  console.log(`Servidor en escucha en el puerto http://localhost:${PORT}`)
  connectDB()
})