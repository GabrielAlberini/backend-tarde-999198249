import crypto from "node:crypto"
import { encontrarUsuario } from "./utils/buscarUsuario";
// uuid

// solamente el sistema aceptara correos con terminación en
// @gmail.com
// @example.com
// @hotmail.com

// todos los correos electronicos que sean ingresados con otro dominio serán considerados spam y no lo registraremos en la db

let usuarios = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    nombre: "Gabriel",
    email: "gabriel@example.com"
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    nombre: "Lucía",
    email: "lucia@example.com"
  },
  {
    id: "123e4567-e89b-12d3-a456-42661411300",
    nombre: "Lucía",
    email: "luciabelen@example.com"
  },
  {
    id: "9b2f3e6a-8d4e-4a3f-9a2b-5f1a4e5d9c11",
    nombre: "Martín",
    email: "martin@example.com"
  },
  {
    id: "c9a64635-4b1c-4ef0-9c65-2a7b5f0c72aa",
    nombre: "Sofía",
    email: "sofia@example.com"
  },
  {
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    nombre: "Valentina",
    email: "valentina@example.com"
  }
];

const argumentos = process.argv
const accion = argumentos[2]

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
  case "buscarUsuario":
    if (!argumentos[3]) {
      console.log("Debes ingresar el nombre del usuario que deseas buscar")
      break
    }

    const usuarioEncontrado = encontrarUsuario(usuarios, argumentos)

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

    const indice = usuarios.findIndex((usuario) => usuario.email === email)

    if (indice === -1) {
      console.log("El usuario no se encuentra en nuestra base de datos")
      break
    }

    const usuarioBorrado = usuarios.splice(indice, 1)
    console.log(usuarioBorrado[0])
    break;
  case "agregarUsuario":
    const nombre = argumentos[3]
    const inputEmail = argumentos[4]

    if (!nombre || !inputEmail) {
      console.log("Debes ingresar los datos requeridos: nombre y email")
      break
    }

    // sanitización de datos
    // const emailsValidos = ["@gmail.com", "@hotmail.com"]
    // if (inputEmail.endsWith("@")) {
    // }

    const usuario = encontrarUsuario(usuarios, argumentos)

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

