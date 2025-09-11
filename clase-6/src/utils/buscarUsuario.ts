const encontrarUsuario = (usuarios: any[], argumentos: string[]) => {
  const usuarioEncontrado = usuarios.find((usuario) =>
    usuario.nombre.toLowerCase() === argumentos[3].toLowerCase())
  return usuarioEncontrado
}

export { encontrarUsuario }