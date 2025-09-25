import fs from "node:fs"

const countries = ["Argentina", "Brasil", "Chile", "México", "España", "Colombia", "Perú", "Uruguay"]
const coursesList = ["JavaScript", "React", "Node.js", "Angular", "Python", "Java", "SQL", "TypeScript"]
const firstNames = ["Ana", "Juan", "María", "Pedro", "Lucía", "Carlos", "Laura", "Diego", "Sofía", "Mateo", "Pepe"]
const lastNames = ["Gómez", "Pérez", "Rodríguez", "Fernández", "López", "Martínez", "Sánchez", "García"]

interface User {
  id: string,
  name: string,
  email: string,
  country: string
}

interface Course {
  id: string,
  course: string,
  userId: string
}

const users: User[] = [{ id: "1", name: "Juan", email: "jaun@gmail.com", country: "Argentina" }]
const courses: Course[] = []

// procesar y crear la lista de usuarios
const generateData = (usersCount: number): { users: User[], courses: Course[] } => {
  // 200
  for (let i = 0; i < usersCount; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const name = `${firstName} ${lastName}`
    const email = `${firstName.toLowerCase()}${lastName.toLowerCase()}@gmail.com`
    const country = countries[Math.floor(Math.random() * countries.length)]

    const id = crypto.randomUUID()

    const newUser = {
      id: id,
      name,
      email,
      country
    }

    users.push(newUser)

    // asignar 1 o más curso por alumno
    const numCourses = Math.floor(Math.random() * 3) + 1

    for (let j = 0; j < numCourses; j++) {
      const courseName = coursesList[Math.floor(Math.random() * coursesList.length)]

      const signCourse = {
        id: crypto.randomUUID(),
        course: courseName,
        userId: id
      }

      courses.push(signCourse)
    }
  }

  return { users, courses }
}

const data = generateData(200)

fs.writeFileSync("./users.json", JSON.stringify(data.users), "utf8")
fs.writeFileSync("./courses.json", JSON.stringify(data.courses), "utf8")