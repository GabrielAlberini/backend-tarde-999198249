// uuid

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

// mostrarle a el cliente el array de usuarios cuando usa el parametro lista
// input -> process -> output

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
    }

    const usuarioEncontrado = usuarios.find((usuario) =>
      usuario.nombre.toLowerCase() === argumentos[3].toLowerCase())

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

    usuarios = usuarios.filter((usuario) => usuario.email !== email)

    // REVER !!
    // if (usuarios.length < usuarios.length) {
    //   console.log(usuarios)
    // } else {
    //   console.log("No existe el usuario en nuestra base de datos")
    // }

    break;
  default:
    console.log("Comando invalido")
    break;
}

// caso de éxito -> borrar el usuario que contengo en la db
// casos de no éxito ->
// 1. que exista un nombre
// 2. nombre no se repita
// 3. que este seguro
// 4. comunicarle que el usuario se borro o no
