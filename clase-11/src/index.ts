import { readDb } from "./db/connection"
import { main } from "./controllers/controller"

const argumentos = process.argv
const accion = argumentos[2]
const usuarios = readDb()

main(argumentos, accion, usuarios)