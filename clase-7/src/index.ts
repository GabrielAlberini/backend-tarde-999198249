import fs from "node:fs"
import crypto from "node:crypto"
import { encontrarUsuario } from "./utils/buscarUsuario"
import { readDb, writeDb } from "./db/connection";

const argumentos = process.argv
const accion = argumentos[2]
const usuarios = readDb()

switch (accion) {
  case "info":
    console.log("---- Comandos validos ----")
    console.log("lista: muestra la lista de usuarios")
    console.log("buscarUsuario: busca un usuario mediante un argumento proporcionado")
    console.log("borrarUsuario: borra un usuario mediante un argumento proporcionado")
    break;
  case "lista":
    console.log(usuarios)
    break;
  // npm run dev buscarUsuario Gabriel
  case "buscarUsuario":
    if (!argumentos[3]) {
      console.log("Debes ingresar el nombre del usuario que deseas buscar")
      break
    }

    const usuarioEncontrado = encontrarUsuario(usuarios, argumentos[3])

    if (!usuarioEncontrado) {
      console.log("No se encuntra el usuario en nuestra base de datos")
    } else {
      console.log(usuarioEncontrado)
    }
    break;
  case "borrarUsuario":
    const email = argumentos[3]

    if (!email) {
      console.log("Debes ingresar un email valido para borrar el registro")
      break
    }

    const indice = usuarios.findIndex((usuario: any) => usuario.email === email)

    if (indice === -1) {
      console.log("El usuario no se encuentra en nuestra base de datos")
      break
    }

    const usuarioBorrado = usuarios.splice(indice, 1)

    // reescribir la base de datos
    writeDb(usuarios)

    console.log(usuarioBorrado[0])
    break;
  case "agregarUsuario":
    const nombre = argumentos[3]
    const inputEmail = argumentos[4]

    if (!nombre || !inputEmail) {
      console.log("Debes ingresar los datos requeridos: nombre y email")
      break
    }

    const usuario = encontrarUsuario(usuarios, argumentos[3])

    if (usuario) {
      console.log("El usuario ya existe en nuestra base de datos")
      break
    }

    const nuevoUsuario = {
      id: crypto.randomUUID(),
      nombre,
      email: inputEmail
    }

    // guardarlo en mongodb 
    usuarios.push(nuevoUsuario)

    console.log(usuarios, "<- lista de usuarios actualizada")
    break;
  default:
    console.log("Comando invalido")
    break;
}

// caso de exíto
// agregarUsuario ✅
// luis ✅
// luis@example.com ✅

// caso de no éxito
// que tengamos la data necesario (nombre y email) ✅
// validaciones de datos...
// que no exista previamente ✅

