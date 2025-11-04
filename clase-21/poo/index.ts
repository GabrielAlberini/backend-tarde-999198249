// 1️⃣ public
// - Es el acceso por defecto.
// - Se puede acceder desde cualquier parte, dentro o fuera de la clase.
// - Los miembros públicos pertenecen a las instancias (objetos creados con "new").
// - Ejemplo típico: propiedades o métodos que se pueden usar libremente.

// 2️⃣ private
// - Solo se puede acceder desde dentro de la clase.
// - Se define con el prefijo "#".
// - No puede usarse ni modificarse fuera de la clase.
// - Sirve para proteger datos internos (encapsulación).

// 3️⃣ static
// - Pertenece directamente a la clase, no a las instancias.
// - Se accede usando el nombre de la clase, no con "this" ni con el objeto.
// - Se usa para constantes, utilidades o métodos compartidos.

// objeto literal
const arandela = {
  edad: 6,
  amigos: ["peperina", "tuerca"]
}

// fabrica de mascotas
// ❌ ya no tendria que definir o crear objetos literales
// ✅ usaria mi clase como modelo para crear mascotas (objetos)

class Mascota {
  // propiedades que tendra CADA mascota
  nombre: string
  edad: number
  especie: string

  // parámetros que instanciarán a la mascota
  constructor(nombre: string, edad: number, especie: string) {
    this.nombre = nombre
    this.edad = edad
    this.especie = especie
  }

  saludar() {
    console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años.`)
  }
}


// ok quiero crear a mascota1 -> arandela -> 6 -> perro
const mascota1 = new Mascota("Arandela", 6, "Perro")
const mascota2 = new Mascota("Peperina", 1, "Gato")

mascota2.saludar()
