# 🎉 Proyecto de Ecommerce 🎉

Este es un proyecto de Ecommerce construido con **Node.js**, **Express**, **MongoDB**, y **Handlebars**. El objetivo de este proyecto es proporcionar una plataforma básica de comercio electrónico que permita a los usuarios gestionar productos y carritos de compra en tiempo real. Incluye funcionalidades de recuperación de contraseña mediante email o SMS.

## 🚀 Clonar el Proyecto

Para clonar este proyecto, sigue estos pasos:

```bash
git clone https://github.com/FeddeARG/BKND-Entregas.git
cd nuevo-repositorio
```

### 📦 Instalar Dependencias

Una vez que hayas clonado el repositorio, necesitas instalar las dependencias necesarias. Ejecuta el siguiente comando:

```bash
npm install
```
Esto instalará todas las dependencias listadas en el archivo \`package.json\`.


### ▶️ Iniciar el Proyecto

Para iniciar el servidor, simplemente ejecuta el siguiente comando:

```bash
npm start // para modo development
npm start:prod // para modo production
```
El servidor se ejecutará en el puerto **8080** por defecto en development y en el puerto **3030** en el caso de encontrarse en production. Puedes acceder a la aplicación en tu navegador web en [http://localhost:8080](http://localhost:8080) o 3030 respectivamente.


# ⚙️ Datos para Testeo
```bash
Admin:
Email: federicoanaranjo@gmail.com
Contraseña: admin3
User:
Email: user@gmail.com
Contraseña: user
```

Los usuarios que se registren tendrán el rol por defecto de user. El rol admin tiene acceso exclusivo a la gestión de productos.

# 🛠️ Funcionalidades Clave

## Roles de Usuario

Admin: Puede realizar un CRUD completo de productos (crear, leer, actualizar, eliminar).

User: Puede agregar productos al carrito, visualizar su carrito, y recuperar su contraseña mediante email o SMS.


## Recuperación de Contraseña

Los usuarios pueden recuperar su contraseña usando el email o mediante SMS.
El SMS debe abrirse desde la computadora, ya que el enlace apunta a localhost.
🔑 Autenticación y Registro
Cualquiera puede registrarse como usuario. El rol por defecto es user, con acceso limitado a las funcionalidades de carrito y recuperación de contraseña. Solo los administradores pueden gestionar productos.


# 📡 Endpoints

Autenticación
Registro de Usuarios

Endpoint: /auth/register
Método: POST
Descripción: Registra un nuevo usuario. El campo role por defecto será user.

```bash
curl -X POST http://localhost:8080/auth/register \
-H 'Content-Type: application/json' \
-d '{
  "first_name": "Nombre",
  "last_name": "Apellido",
  "age": 30,
  "email": "user@example.com",
  "phone": "+5491159546666",
  "password": "password"
}'
```

## Iniciar Sesión

Endpoint: /auth/login
Método: POST
Descripción: Permite a un usuario autenticarse. Se genera un token JWT para el acceso.

```bash
curl -X POST http://localhost:8080/auth/login \
-H 'Content-Type: application/json' \
-d '{
  "email": "user@example.com",
  "password": "password"
}'
```

## Recuperación de Contraseña (Email/SMS)

Endpoint: /auth/reset-password
Método: POST
Descripción: Permite al usuario elegir si desea recuperar su contraseña por email o SMS.

```bash
curl -X POST http://localhost:8080/auth/reset-password \
-H 'Content-Type: application/json' \
-d '{
  "email": "user@example.com",
  "method": "email"
}'
```

## Restablecer Contraseña

Endpoint: /auth/reset-password/:token
Método: POST
Descripción: Restablece la contraseña usando el token proporcionado por email o SMS.

```bash
curl -X POST http://localhost:8080/auth/reset-password/<token> \
-H 'Content-Type: application/json' \
-d '{
  "newPassword": "nuevaPassword"
}'
```

## Productos

Obtener Todos los Productos

Endpoint: /api/products
Método: GET
Descripción: Obtiene una lista de todos los productos con paginación, filtrado y ordenamiento opcional.

```bash
curl -X GET "http://localhost:8080/api/products?limit=5&page=1&sort=asc&query=category=Laundry"
```

## Crear Producto (Admin)

Endpoint: /api/products
Método: POST
Descripción: Crea un nuevo producto (solo accesible para admins).

```bash
curl -X POST http://localhost:8080/api/products \
-H 'Content-Type: application/json' \
-d '{
  "title": "Nuevo Producto",
  "description": "Descripción del producto",
  "code": "PROD001",
  "price": 1500,
  "stock": 100,
  "category": "Electronics",
  "thumbnails": ["url_de_imagen"]
}'
```

## Actualizar Producto (Admin)

Endpoint: /api/products/:pid
Método: PUT
Descripción: Actualiza un producto existente por su ID.

```bash
curl -X PUT http://localhost:8080/api/products/66b1537cf0d705fa5595d5cf \
-H 'Content-Type: application/json' \
-d '{
  "price": 120
}'
```

## Eliminar Producto (Admin)

Endpoint: /api/products/:pid
Método: DELETE
Descripción: Elimina un producto por su ID.

```bash
curl -X DELETE http://localhost:8080/api/products/66b1537cf0d705fa5595d5cf
```

### Carrito

# Ver el Carrito

Endpoint: /api/carts
Método: GET
Descripción: Obtiene el contenido del carrito de compras.

```bash
curl -X GET http://localhost:8080/api/carts
```

# Agregar Producto al Carrito

Endpoint: /api/carts/add/:pid
Método: POST
Descripción: Agrega un producto al carrito de compras.

```bash
curl -X POST http://localhost:8080/api/carts/add/66b1537cf0d705fa5595d5cf \
-H 'Content-Type: application/json' \
-d '{
  "quantity": 2
}'
```

# Eliminar Producto del Carrito

Endpoint: /api/carts/remove/:pid
Método: POST
Descripción: Elimina una cantidad específica de un producto del carrito.

```bash
curl -X POST http://localhost:8080/api/carts/remove/66b1537cf0d705fa5595d5cf \
-H 'Content-Type: application/json' \
-d '{
  "quantity": 1
}'
```

# Vaciar Carrito

Endpoint: /api/carts/clear
Método: POST
Descripción: Vacía todo el carrito de compras.

```bash
curl -X POST http://localhost:8080/api/carts/clear
```

## 📝 Sobre el Proyecto

Este proyecto de Ecommerce está diseñado para proporcionar una plataforma básica donde los usuarios pueden gestionar productos en sus carritos de compra y un administrador puede controlar la relación entre productos y base de datos. Utiliza Node.js y Express, y muchas otras librerías que se pueden apreciar en el package.json


## 🛠️ Funcionalidades Clave

# Gestión de Productos: Crear, leer, actualizar y eliminar productos (para admin).
# Gestión de Carritos: Agregar productos al carrito, eliminar productos del carrito y vaciar el carrito (para user).
# Actualización en Tiempo Real: Los cambios en los productos y carritos se reflejan en tiempo real.
# Paginación y Filtrado: Soporte para paginación, filtrado y ordenamiento de productos.


#### 🎉 ¡Muchas gracias por llegar hasta aquí! 🎉