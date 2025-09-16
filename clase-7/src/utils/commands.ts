export const commands = [
  { comando: "lista", descripcion: "Muestra la lista de usuarios", parametros: "" },
  { comando: "agregaUsuario", descripcion: "Agrega un usuario a la lista de usuarios", parametros: ["nombre", "email"] },
  { comando: "buscarUsuario", descripcion: "Busca un usuario mediante un argumento proporcionado", parametros: ["nombre"] },
  { comando: "borrarUsuario", descripcion: "Borra un usuario mediante un argumento proporcionado", parametros: ["email"] },
  { comando: "actualizarUsuario", descripcion: "Actualiza un usuario mediante un argumento proporcionado", parametros: ["nombre", "email"] }
]