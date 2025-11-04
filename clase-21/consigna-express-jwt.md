# Consigna de Desarrollo 

## Objetivo general
Desarrollar desde cero un servidor backend en Node.js con Express y TypeScript, aplicando autenticación con JWT y siguiendo la arquitectura MVC.  
El servidor deberá incluir:
- Conexión a MongoDB mediante Mongoose.  
- Creación de una entidad personalizada.  
- Endpoints básicos `GET` y `POST`.  
- Sistema de registro y login de usuarios.

---

## Requerimientos técnicos

### 1. Inicialización del proyecto
- Crear un nuevo proyecto con `npm init -y`.  
- Instalar las dependencias necesarias:
  ```bash
  express mongoose bcryptjs jsonwebtoken cors
  ```
- Instalar las dependencias de desarrollo:
  ```bash
  typescript ts-node-dev @types/node @types/express @types/jsonwebtoken @types/bcryptjs
  ```
- Inicializar TypeScript:
  ```bash
  npx tsc --init
  ```

### 2. Estructura de carpetas (MVC)
```
src/
├─ controllers/
├─ models/
├─ routes/
├─ middlewares/
├─ config/
└─ index.ts
```

### 3. Configuración básica
- Crear el servidor en `index.ts`.  
- Configurar CORS y `express.json()`.  
- Conectar a MongoDB mediante una función `connectDB`.

### 4. Autenticación de usuarios
- Crear modelo `User` con Mongoose (campos: `email`, `password`).  
- Crear controladores para:
  - `POST /auth/register`: registro de usuarios (encriptar contraseña con bcrypt).  
  - `POST /auth/login`: autenticación y emisión de token JWT.  
- Crear un middleware que valide el token y agregue los datos del usuario a `req`.

### 5. Entidad personalizada
- Definir un modelo adicional (por ejemplo `Task`, `Product` o `Note`).  
- Crear controladores para:
  - `GET /entidad`: listar elementos asociados al usuario logueado.  
  - `POST /entidad`: crear un nuevo elemento asociado al usuario autenticado.  
- Proteger las rutas con middleware de autenticación.

### 6. Buenas prácticas
- Tipar correctamente con TypeScript todas las funciones y modelos.  
- Manejar errores con `try/catch`.  
- Respetar la estructura de carpetas MVC.