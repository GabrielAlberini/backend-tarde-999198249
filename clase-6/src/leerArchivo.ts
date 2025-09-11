// file system
import fs from "node:fs"

const data = JSON.parse(fs.readFileSync("./src/listaUsuarios.json", "utf-8"))

data.push({ data: 1 })

fs.writeFileSync("./src/listaUsuarios.json", JSON.stringify(data))