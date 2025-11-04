import { Router } from "express"
import AuthController from "../controllers/authController"

const authRouter = Router()

// http://localhost:3000/auth
authRouter.post("/register", AuthController.register)
authRouter.post("/login", AuthController.login)

export default authRouter