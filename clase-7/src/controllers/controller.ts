import crypto from "node:crypto"
import { encontrarUsuario } from "../utils/buscarUsuario"
import { writeDb } from "../db/connection";
import { commands } from "../utils/commands";

const main = (argumentos: any[], accion: string, usuarios: any[]) => {
  switch (accion) {
    case "info":
      console.log("---- Comandos válidos ----")
      console.table(commands)
      break;
    case "lista":
      console.log(usuarios)
      break;
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

      usuarios.push(nuevoUsuario)
      writeDb(usuarios)

      console.log(usuarios, "<- lista de usuarios actualizada")
      break;
    case "actualizarUsuario":
      const nombreUsuario = argumentos[3]
      const emailUsuario = argumentos[4]

      if (!nombreUsuario || !emailUsuario) {
        console.log("Debes ingresar los datos requeridos: nombre y email")
        break
      }

      const usuarioAActualizar = encontrarUsuario(usuarios, nombreUsuario)

      if (!usuarioAActualizar) {
        console.log("El usuario no existe en nuestra base de datos")
        break
      }

      usuarioAActualizar.email = emailUsuario
      writeDb(usuarios)

      console.log(usuarioAActualizar)
      break
    default:
      console.log("Comando invalido")
      break
  }
}

export { main }