import { commands } from "../utils/commands";
import mongoose, { Schema } from "mongoose"

const URI_DB = "mongodb://localhost:27017/db_mongo_utn"

const connectDB = async (URI: string) => {
  try {
    await mongoose.connect(URI)
    console.log("✅ Conectado a mongo DB")
  } catch (error) {
    const e = error as Error
    console.log("❌ Error al conectarse a la base de datos:", e.name)
    process.exit(1)
  }
}

interface IUser {
  nombre: string,
  email: string
}

const UserSchema = new Schema<IUser>({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true }
}, {
  versionKey: false
})

const User = mongoose.model<IUser>("User", UserSchema)

const main = async (argumentos: string[], accion: string, usuarios: any[]) => {
  await connectDB(URI_DB)

  switch (accion) {
    case "info":
      console.log("---- Comandos válidos ----")
      console.table(commands)
      break;
    case "lista":
      const users = await User.find({})
      console.log(users)
      break;
    case "buscarUsuario":
      if (!argumentos[3]) {
        console.log("Debes ingresar el nombre del usuario que deseas buscar")
        break
      }

      // PASO 1 = traernos los usuarios
      // PASO 2  = convertir el nombre de cada usuario en min
      // PASO 3 = convertir el argumento a min 
      // PASO 4 = hacer la comparación

      //  {
      //   _id: ObjectId('68dc2db02e687a1210f23fae'),
      //   nombre: 'miguel castillo',
      //   email: 'miguel@gmail.com'
      // }

      // miguel castillo


      const usuarioEncontrado = await User.findOne({
        nombre: new RegExp(`${argumentos[3]}$`, "i")
      })
      // const usuarioEncontrado = encontrarUsuario(usuarios, argumentos[3])

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

      // const indice = usuarios.findIndex((usuario: any) => usuario.email === email)

      // if (indice === -1) {
      //   console.log("El usuario no se encuentra en nuestra base de datos")
      //   break
      // }

      // const usuarioBorrado = usuarios.splice(indice, 1)

      // writeDb(usuarios)

      const usuarioBorrado = await User.findOneAndDelete({ email })

      if (!usuarioBorrado) {
        console.log("No se encuentra el usuario para borrar")
      } else {
        console.log("Usuario borrado con éxito")
      }

      break;
    case "agregarUsuario":
      const nombre = argumentos[3]
      const inputEmail = argumentos[4]

      if (!nombre || !inputEmail) {
        console.log("Debes ingresar los datos requeridos: nombre y email")
        break
      }

      // const usuario = encontrarUsuario(usuarios, argumentos[3])

      // if (usuario) {
      //   console.log("El usuario ya existe en nuestra base de datos")
      //   break
      // }

      // const nuevoUsuario = {
      //   id: crypto.randomUUID(),
      //   nombre,
      //   email: inputEmail
      // }

      // usuarios.push(nuevoUsuario)
      // writeDb(usuarios)

      const existe = await User.findOne({ email: inputEmail })

      if (existe) {
        console.log("El usuario ya existe en nuestra base de datos")
        break
      }

      const nuevoUsuario = new User({ nombre: nombre.toLowerCase(), email: inputEmail.toLowerCase() })
      await nuevoUsuario.save()

      console.log(nuevoUsuario, "nuevo usuario")
      break;
    case "actualizarUsuario":
      const nombreUsuario = argumentos[3]
      const emailUsuario = argumentos[4]

      if (!nombreUsuario || !emailUsuario) {
        console.log("Debes ingresar los datos requeridos: nombre y email")
        break
      }

      // const usuarioAActualizar = encontrarUsuario(usuarios, nombreUsuario)

      // if (!usuarioAActualizar) {
      //   console.log("El usuario no existe en nuestra base de datos")
      //   break
      // }

      // usuarioAActualizar.email = emailUsuario
      // writeDb(usuarios)

      // filtro, actualizacion, opciones
      const usuarioAActualizar = await User.findOneAndUpdate(
        { nombre: nombreUsuario.toLowerCase() },
        { email: emailUsuario },
        { new: true }
      )

      console.log(usuarioAActualizar || "No existe el usuario a actualizar")
      break
    default:
      console.log("Comando invalido")
      break
  }

  process.exit(1)
}

export { main }