import fs from "node:fs"

let dataResponse = JSON.parse(fs.readFileSync("./src/listaUsuarios.json", "utf-8"))

dataResponse.usuarios.push({
  id: crypto.randomUUID(),
  nombre: "Pepe",
  email: "pepe@gmail.com"
})

fs.writeFileSync("./src/listaUsuarios.json", JSON.stringify(dataResponse))