import fs from "node:fs"

const DB_PATH = "./src/listaUsuarios.json"

const readDb = () => JSON.parse(fs.readFileSync(DB_PATH, "utf-8"))

const writeDb = (usuarios: any) => fs.writeFileSync(DB_PATH, JSON.stringify(usuarios))

export { readDb, writeDb }