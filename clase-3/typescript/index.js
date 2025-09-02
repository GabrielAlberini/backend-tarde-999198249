// tipado debil
// tipar los parametros
const sumar = (n1, n2) => {
  if (typeof n1 !== "number" || typeof n2 !== "number") {
    return "Debes ingresar un número valido"
  }
  return n1 + n2
}

console.log(sumar(1, 2))