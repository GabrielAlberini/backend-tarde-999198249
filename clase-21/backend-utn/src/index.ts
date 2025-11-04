// LEVANTAR NUESTRO SERIVICIO Y CONFIGURACIONES GLOBALES
import express, { Request, Response } from "express"
import cors from "cors"
import connectDB from "./config/mongodb"
import productRouter from "./routes/productRoutes"
import authRouter from "./routes/authRouter"
import authMiddleware from "./middleware/authMiddleware"
import limiter from "./middleware/rateLimitMiddleware"
import morgan from "morgan"
import IUserTokenPayload from "./interfaces/IUserTokenPayload"
import dotenv from "dotenv"
dotenv.config()

declare global {
  namespace Express {
    interface Request {
      user?: IUserTokenPayload
    }
  }
}

const PORT = process.env.PORT

const app = express()

app.use(cors())
app.use(express.json())

app.use(morgan("dev"))

app.get("/", (__: Request, res: Response) => {
  res.json({ status: true })
})

app.use("/auth", limiter, authRouter)
app.use("/products", productRouter)

// endpoint para el 404 - no se encuentra el recurso
app.use((__, res) => {
  res.status(404).json({ success: false, error: "El recurso no se encuentra" })
})

// servidor en escucha
app.listen(PORT, () => {
  console.log(`✅ Servidor en escucha en el puerto http://localhost:${PORT}`)
  connectDB()
})