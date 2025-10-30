import rateLimit from "express-rate-limit"

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,// 15 minutos,
  max: 5,
  handler: (req, res, next, options) => {
    res.status(429).json({
      success: false,
      error: `Limite alcanzado ${options.max} solicitudes cada ${options.windowMs / 1000 / 60} minutos.`
    })
  }
})

export default limiter