# 📝 Consignas CRUD en MongoDB

1. Crea una base de datos llamada **`libraryDB`**.  

2. Dentro de la base de datos, crea una colección llamada **`books`**.  

3. Inserta al menos **5 documentos** en la colección con los siguientes campos:
   - `title` (string) → título del libro en español.  
   - `author` (string) → autor en español.  
   - `year` (number) → año de publicación.  
   - `genre` (string) → género del libro en español.  
   - `available` (boolean) → si está disponible en la biblioteca.  

4. Realiza las siguientes operaciones CRUD:  
   - **Create**: inserta un nuevo libro.  
   - **Read**: busca todos los libros de un autor específico.  
   - **Update**: cambia la disponibilidad (`available`) de un libro.  
   - **Delete**: elimina un libro por su título.  

---

# 🔎 Operadores en consultas (find)

1. Usa `$gt` para traer todos los libros publicados después de 1950.  
2. Usa `$lte` para traer todos los libros publicados hasta el año 1960 inclusive.  
3. Usa `$in` para traer todos los libros cuyo género sea **Novela** o **Poesía**.  
4. Usa `$and` para traer todos los libros disponibles de un autor específico.  
5. Usa `$or` para traer todos los libros publicados antes de 1900 o después del 2000.  

---

## Documentación para operadores
https://www.w3schools.com/mongodb/mongodb_query_operators.php