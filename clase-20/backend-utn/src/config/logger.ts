// src/config/logger.ts
import morgan from "morgan"
import fs from "node:fs"
import path from "node:path"

// Crear carpeta /logs si no existe
const logsDir = path.join(__dirname, "../../logs")

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir)
}

// Crear stream de escritura diaria
const getLogStream = () => {
  const date = new Date().toISOString().slice(0, 10) // YYYY-MM-DD
  const logFile = path.join(logsDir, `access-${date}.log`)
  return fs.createWriteStream(logFile, { flags: "a" }) // modo append
}

// Formato combinado (IP, método, ruta, status, tiempo)
const logger = morgan(
  ":remote-addr :method :url :status :res[content-length] - :response-time ms",
  { stream: getLogStream() }
)

export default logger
