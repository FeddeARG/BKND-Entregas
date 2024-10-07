# Backend2 Final - Ecommerce

Este proyecto es una aplicación **ecommerce** desarrollada con **Node.js**, **Express**, **MongoDB**, **HBS** y **Passport.js** para la autenticación. El sistema permite a los usuarios registrarse, agregar productos a su carrito de compras, y realizar compras. Los administradores pueden gestionar productos en el sistema (crear, editar y eliminar).

## Requisitos

- Node.js v14+ o superior
- MongoDB

## Instalación

1. Clonar este repositorio o descargar los archivos del proyecto.

```bash
git clone <url_del_repositorio>
```

2. Instalar las dependencias del proyecto.

```bash
npm install
```

3. Configurar las variables de entorno.

   Las variables de entorno necesarias están proporcionadas en un archivo `.zip` junto con el link de entrega. Coloca el archivo **`.env.development`** y **`.env.production`** en la raíz del proyecto. Estas variables incluyen las credenciales de Twilio, Nodemailer, MongoDB y otras necesarias para el correcto funcionamiento del sistema.

4. Ejecutar el proyecto en modo desarrollo.

```bash
npm start
```

5. Para ejecutar en producción:

```bash
npm run start:prod
```

## Funcionalidades

### 1. Registro y Autenticación

Los usuarios pueden registrarse y autenticarse utilizando su correo electrónico y contraseña.

- **Ruta de Registro**: `/auth/register`
- **Ruta de Login**: `/auth/login`

Una vez registrados y autenticados, el usuario puede acceder a las funcionalidades del ecommerce.

### 2. Carrito de Compras

- Los **usuarios** pueden agregar productos a su carrito de compras.
- Los productos se pueden **añadir**, **remover** o **vaciar** del carrito.
- El carrito se actualiza en tiempo real y se almacena en la base de datos.

- **Rutas de Carrito**:
  - Agregar producto: `POST /api/carts/add/:productId`
  - Remover producto: `POST /api/carts/remove/:productId`
  - Vaciar carrito: `POST /api/carts/clear`
  - Comprar carrito: `POST /api/carts/purchase`

### 3. Realización de Compras

- Los usuarios pueden completar su compra mediante la opción de "Comprar Carrito".
- Al realizar la compra, se genera un **ticket** de compra que se envía al correo electrónico del usuario. Este ticket incluye los detalles de la transacción.
- **Ruta de Compra**: `/api/carts/purchase`

### 4. Gestión de Productos (Administradores)

Los **administradores** tienen permisos adicionales que les permiten gestionar los productos del ecommerce.

- **Crear**, **editar**, **eliminar** productos.
- Solo los usuarios con rol **admin** pueden acceder a las funcionalidades de gestión de productos.

- **Rutas de Productos**:
  - Obtener todos los productos: `GET /api/products`
  - Obtener producto por ID: `GET /api/products/:id`
  - Crear producto: `POST /api/products`
  - Actualizar producto: `PUT /api/products/:id`
  - Eliminar producto: `DELETE /api/products/:id`

### 5. Recuperación de Contraseña

- Los usuarios pueden recuperar su contraseña mediante un enlace que se envía a su correo electrónico.
- **Ruta para solicitar recuperación de contraseña**: `/auth/reset-password`
- **Ruta para restablecer la contraseña**: `/auth/reset-password/:token`

### 6. Autenticación y Autorización

El sistema utiliza **JWT** para la autenticación de los usuarios y el manejo de sesiones.

- **JWT** se utiliza para verificar la identidad del usuario en cada solicitud.
- Los administradores son identificados por su rol y tienen acceso a más funcionalidades.

### 7. Vistas

- **Productos en Tiempo Real**: Los usuarios pueden ver los productos en tiempo real y agregar productos a su carrito.
  - **Ruta**: `/realtimeproducts`
- **Vista de Administrador**: Los administradores pueden gestionar los productos.
  - **Ruta**: `/admin/products`

## Diferencias entre Usuarios y Administradores

- **Usuarios regulares**:
  - Pueden registrarse, iniciar sesión, ver productos, agregar productos a su carrito y realizar compras.
  
- **Administradores**:
  - Tienen permisos adicionales para crear, actualizar y eliminar productos. Pueden acceder a un panel de administración donde gestionan los productos.

## Ejemplo de Flujo de Usuario

1. **Registro**: El usuario accede a la ruta `/auth/register` y se registra con su correo electrónico y contraseña.
2. **Login**: Luego de registrarse, el usuario inicia sesión en `/auth/login`.
3. **Explorar Productos**: Una vez autenticado, el usuario puede explorar los productos disponibles en `/realtimeproducts`.
4. **Agregar Productos al Carrito**: El usuario selecciona productos y los agrega a su carrito.
5. **Comprar Carrito**: Al finalizar la selección, el usuario procede a comprar el carrito en la misma vista.
6. **Ticket de Compra**: Después de la compra, el usuario recibe un ticket en su correo electrónico con los detalles de la transacción.
