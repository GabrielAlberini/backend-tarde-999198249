import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const SECRET_KEY = "msdjlkfnhasjlkdfasdf"
  const header = req.headers.authorization

  if (!header) {
    return res.status(401).json({ succes: false, error: "El token es requerido" })
  }

  const token = header.split(" ")[1]

  try {
    // payload
    const payload = verify(token, SECRET_KEY);

    (req as any).user = payload

    next()
  } catch (e) {
    const error = e as Error
    res.status(401).json({ succes: false, error: error.message })
  }
}

export default authMiddleware 