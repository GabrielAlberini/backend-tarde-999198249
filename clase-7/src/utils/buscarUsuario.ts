const encontrarUsuario = (usuarios: any[], nombre: string) => usuarios.find((usuario) =>
  usuario.nombre.toLowerCase() === nombre.toLowerCase())

export { encontrarUsuario }