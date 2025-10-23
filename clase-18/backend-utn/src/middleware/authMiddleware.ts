import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

const authMiddleware = (request: Request, response: Response, next: NextFunction) => {
  const SECRET_KEY = "msdjlkfnhasjlkdfasdf"
  const header = request.headers.authorization

  if (!header) {
    return response.status(401).json({ error: "El token es requerido" })
  }

  const token = header.split(" ")[1]

  try {
    // payload
    const payload = verify(token, SECRET_KEY);

    console.log(request);

    (request as any).user = payload

    next()
  } catch (e) {
    const error = e as Error
    response.status(401).json({ error: error.message })
  }
}

export default authMiddleware 