const nombrePasadoPorElUsuario = process.argv[2]
console.log(`Hola ${nombrePasadoPorElUsuario}`)

// Crear una función separarParesImpares que reciba un array de number y devuelva un objeto con dos arrays: pares e impares.

// [1, 43, 33, 2]

// {
//   pares: [2]
//   impares: [1, 43, 33]
// }

interface Resultado {
  pares: number[],
  impares: number[]
}

const separarParesImpares = (numeros: number[]): Resultado => {
  const resultado: Resultado = { pares: [], impares: [] }

  numeros.forEach((numero) => {
    if (numero % 2 === 0) {
      resultado.pares.push(numero)
    } else {
      resultado.impares.push(numero)
    }
  })

  return resultado
}

console.log("-------------------------------------------------------")

// "["1", "2", "3"]"
// [1,2,3]
const arrayDeNumeros = JSON.parse(process.argv[2])

const arrayGenerada = separarParesImpares(arrayDeNumeros)
console.log(arrayGenerada)