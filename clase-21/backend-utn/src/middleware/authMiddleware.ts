import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"
import IUserTokenPayload from "../interfaces/IUserTokenPayload"

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const SECRET_KEY = process.env.JWT_SECRET!
  const header = req.headers.authorization

  if (!header) {
    return res.status(401).json({ succes: false, error: "El token es requerido" })
  }

  const token = header.split(" ")[1]

  try {
    const payload = verify(token, SECRET_KEY);

    req.user = payload as IUserTokenPayload

    next()
  } catch (e) {
    const error = e as Error
    res.status(401).json({ succes: false, error: error.message })
  }
}

export default authMiddleware 