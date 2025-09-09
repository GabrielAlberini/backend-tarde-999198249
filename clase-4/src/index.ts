import { Arandela } from "./interfaces/mascotas"
import { separarParesImpares } from "./argumentos"

const sumar = (n1: number, n2: number) => {
  return n1 + n2
}

// tipos estaticos en ts
// acersión de tipo
let nombre: string = "Gabriel"
nombre = "Julio"

let heramnos: number = 2

let carnetDeConducir: boolean = true

let mascota: undefined

let bicicleta: null = null

let listaDeColores: string[] = ["rojo", "azul", "marrón"]

listaDeColores.push("violeta")

const arrayDeDatosMultiples: (string | number)[] = [1, "hola", 2, "pepe"]
const credenciales: [string, number] = ["gabi@gmail.com", 35483495]

const usuario: {
  nombre: string,
  correoElectronico: string,
  password: number,
  logged: boolean
} = {
  nombre: "gabrielalberini",
  correoElectronico: "gabi@gmail.com",
  password: 35483495,
  logged: true
}

usuario.logged = false

console.log(usuario)

// ---------

// type
// definición multiple sobre posibles valores
type OpcionesResultado = number | string

// interface
// molde o contrato sobre los objetos

let resultado: OpcionesResultado

let opcionHumano: string, opcionPc: string

const opciones = ["cara", "seca"]

opcionPc = opciones[Math.round(Math.random())]
opcionHumano = "cara"
let opcionElegida = "seca"

if (opcionElegida === opcionPc && opcionElegida === opcionHumano) {
  resultado = "Empate"
} else if (opcionElegida === opcionPc && opcionElegida !== opcionHumano) {
  resultado = "Gano la pc"
} else if (opcionElegida === opcionHumano && opcionElegida !== opcionPc) {
  resultado = "Gano el humano"
} else {
  resultado = 0
}

console.log(resultado)

let algo: any

algo = 1
algo = "hola"
algo = true
algo = []

// interface Arandela -> contrato
const arandela: Arandela = {
  amigos: 123,
  duenio: "gabriel",
  comio: false,
  edad: 6
}

// Escribir una función sumarNumeros que reciba un array de number y devuelva la suma total.

// [1,2,3] -> 6

const sumarNumeros = (numeros: number[]) => {
  let resultado: number = 0
  numeros.forEach((numero) => resultado += numero)
  return resultado
}

sumarNumeros([10, 100, 1000])

console.log(separarParesImpares([1, 2, 3]))