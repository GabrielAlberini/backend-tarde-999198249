import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import User from "../model/UserModel"
import jwt from "jsonwebtoken"

const SECRET_KEY = "msdjlkfnhasjlkdfasdf"

class AuthController {
  static register = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        return res.status(400).json({ success: false, error: "Datos invalidos" })
      }

      // crear el hash de la contraseña
      const hash = await bcrypt.hash(password, 10)
      const newUser = new User({ email, password: hash })

      await newUser.save()
      res.json({ success: true, data: newUser })
    } catch (e) {
      const error = e as Error
      switch (error.name) {
        case "MongoServerError":
          return res.status(409).json({ success: false, error: "Usuario ya existente en nuestra base de datos" })
      }
    }
  }

  static login = async (request: Request, response: Response): Promise<void | Response> => {
    try {
      const { email, password } = request.body

      if (!email || !password) {
        return response.status(400).json({ success: false, error: "Datos invalidos" })
      }

      const user = await User.findOne({ email })

      if (!user) {
        return response.status(401).json({ success: false, error: "No autorizado" })
      }

      // validar la contraseña
      const isValid = await bcrypt.compare(password, user.password)

      if (!isValid) {
        return response.status(401).json({ success: false, error: "No autorizado" })
      }

      const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" })
      response.json({ success: true, token })
    } catch (e) {
      const error = e as Error
      response.status(500).json({ success: false, error: error.message })
    }
  }
}

export default AuthController