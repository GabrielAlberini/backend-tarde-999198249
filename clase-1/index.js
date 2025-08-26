import { multiplicar } from "./calculadora.js"

// forma de ejecución de un archivo js:
// -> mediante el html -> navegador
// -> mediante node -> computadora

// javascript -> ECMAscript -> ES6

// variables -> reserva de espacio en memoria para guardar data
// var nombre = "Pepe" -> variable de acceso global
let edad = 31
const pais = "Argentina"

// sintaxis de las varibles
// palabra reservada -> let o const
// let -> se puede reasignar en tiempo de ejecución
// const -> no se puede reasignar

let colorFav = "celeste"
colorFav = "fideos"

console.log(colorFav)

// const PI = 3.1416
// PI = "pepe"

// destructuring de datos complejos 
const user = {
  id: 1,
  name: "Gabo",
  years: 31
}

const { name, years } = user

console.log(`Hola, soy ${name} y tengo ${years} años.`)

// Operadores
// aritméticos -> operaciones matematicas -> procesos de los datos
// lógicos -> operaciones de respuesta booleana -> si o no -> true o false

// +
console.log(3 + 1)

// %
// si tengo 4 manzanas y 2 personas y tengo que repartirlo en partes iguales, CUANTO ME SOBRA?
console.log(123812389 % 2)

// ---------

// operador lógico AND -> && 
let poseeCarnet = true
let edadDelConductor = 18

// multiples condiciones tienenes que dar true para que la sentencia se evalue como true también
console.log(poseeCarnet && edadDelConductor >= 18)

// operador lógico OR -> ||
let edadParaEntrar = 12
let invitacion = true

// si pasa la validación es true si no false
console.log(edadParaEntrar >= 18 || invitacion && edadParaEntrar >= 17)

// funciones -> bloque de código que abstrae un proceso en particular y se puede reutilizar

let nombre = "pepe"

// declaración de función
// scope -> define el area de ejecución -> zona privada
// EN LA DECLARACIÓN DE LA FUNCIÓN SE DECLARAN TAMBIÉN LOS NOMBRES DE LOS PARAMETROS
function saludar(nombre = "sin nombre", apellido = "sin apellido") {
  console.log(`Hola ${nombre} ${apellido}`)
}

// invocación de función
// argumento -> valor para el parametro
saludar("Gabriel")

// ---------
// arrow functions

const saludar2 = (nombre, apellido) => {
  return `Hola ${nombre} ${apellido}`
}

// cuando un arrow function tiene una linea de código que ADEMÁS se retorna se puede un return implísito
// cuando tenemos solo UN parámetro se pueden obviar los parantesis
const convertirSaludoAMayus = saludoEnMinus => saludoEnMinus.toUpperCase()

const saludo = saludar2("Matías", "Enriquez")
const saludoEnMayus = convertirSaludoAMayus(saludo)

console.log(saludoEnMayus)

// sumar
const sumar = (n1, n2) => {
  const resultado = n1 + n2
  return resultado
}

// encontrar en el array de frutas lo que el usuario quiera

const frutas = ["pera", "manzana", "banana", "kiwi", "pelón"]

const opcionUsuario = "kiwi"

// output -> El usuario eligió la manzana que se encuentra en la posicion 1 del array

// .find() -> realiza un bucle en un array y retorna el primer elemento que coincida en la busqueda

const frutaElegida = frutas.find(fruta => fruta === opcionUsuario)
const indiceDeFrutaElegida = frutas.indexOf(frutaElegida)

console.log(`El usuario eligió la fruta ${frutaElegida} que se encuentra en la posicion ${indiceDeFrutaElegida} del array`)

// sumar
const restar = (n1, n2) => n1 - n2

const resta = restar(10, 2)
console.log(resta)

const resultado = multiplicar(4, 4)
console.log(resultado)