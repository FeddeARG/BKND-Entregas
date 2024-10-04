
# 🎉 Proyecto de Ecommerce 🎉

Este es un proyecto de Ecommerce construido con **Node.js**, **Express**, **MongoDB**, y **Handlebars**. El objetivo de este proyecto es proporcionar una plataforma básica de comercio electrónico que permita a los usuarios gestionar productos y carritos de compra en tiempo real.

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
npm start
```

El servidor se ejecutará en el puerto **8080** por defecto. Puedes acceder a la aplicación en tu navegador web en [http://localhost:8080](http://localhost:8080).

## 📡 Endpoints

A continuación se presentan los endpoints disponibles en esta aplicación junto con ejemplos de uso:

### Productos

#### Obtener Todos los Productos

- **Endpoint:** \`/api/products\`
- **Método:** \`GET\`
- **Descripción:** Obtiene una lista de todos los productos. Soporta paginación, filtrado y ordenamiento.
- **Parámetros Opcionales:**
  - \`limit\`: Número de productos a devolver (por defecto es 10).
  - \`page\`: Número de la página a devolver (por defecto es 1).
  - \`sort\`: Ordenar los productos por precio (\`asc\` o \`desc\`).
  - \`query\`: Filtro para buscar productos por categoría o disponibilidad.
- **Ejemplo de Uso:**

```bash
curl -X GET "http://localhost:8080/api/products?limit=5&page=1&sort=asc&query=category=Laundry"
```

#### Obtener un Producto por ID

- **Endpoint:** \`/api/products/:pid\`
- **Método:** \`GET\`
- **Descripción:** Obtiene un producto específico por su ID.
- **Ejemplo de Uso:**

```bash
curl -X GET "http://localhost:8080/api/products/66b1537cf0d705fa5595d5cf"
```

#### Crear un Nuevo Producto

- **Endpoint:** \`/api/products\`
- **Método:** \`POST\`
- **Descripción:** Crea un nuevo producto.
- **Cuerpo de la Solicitud:**

```json
{
  "title": "Cleaner desirednumber",
  "description": "Description Cleaner desirednumber",
  "code": "CNR-desirednumber",
  "price": integer number,
  "status": true,
  "stock": integer number,
  "category": "Laundry",
  "thumbnails": "url_de_imagen"
}
```
- **Ejemplo de Uso:**

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "title": "Cleaner desirednumber",
  "description": "Description Cleaner desirednumber",
  "code": "CNR-desirednumber",
  "price": integer number,
  "status": true,
  "stock": integer number,
  "category": "Laundry",
}' "http://localhost:8080/api/products"
```

#### Actualizar un Producto

- **Endpoint:** \`/api/products/:pid\`
- **Método:** \`PUT\`
- **Descripción:** Actualiza un producto existente por su ID.
- **Cuerpo de la Solicitud:**

```json
{
  "price": 120
}
```
- **Ejemplo de Uso:**

```bash
curl -X PUT -H "Content-Type: application/json" -d '{
  "price": 120
}' "http://localhost:8080/api/products/66b1537cf0d705fa5595d5cf"
```

#### Eliminar un Producto

- **Endpoint:** \`/api/products/:pid\`
- **Método:** \`DELETE\`
- **Descripción:** Elimina un producto por su ID.
- **Ejemplo de Uso:**

```bash
curl -X DELETE "http://localhost:8080/api/products/66b1537cf0d705fa5595d5cf"
```

## 🛒 Carrito de Compras

### Ver el Carrito

- **Endpoint:** \`/api/carts\`
- **Método:** \`GET\`
- **Descripción:** Obtiene el contenido del carrito de compras.
- **Ejemplo de Uso:**

```bash
curl -X GET "http://localhost:8080/api/carts"
```

### Agregar un Producto al Carrito

- **Endpoint:** \`/api/carts/add/:pid\`
- **Método:** \`POST\`
- **Descripción:** Agrega un producto al carrito de compras.
- **Cuerpo de la Solicitud:**

```json
{
  "quantity": 2
}
```
- **Ejemplo de Uso:**

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "quantity": 2
}' "http://localhost:8080/api/carts/add/66b1537cf0d705fa5595d5cf"
```

### Eliminar un Producto del Carrito

- **Endpoint:** \`/api/carts/remove/:pid\`
- **Método:** \`POST\`
- **Descripción:** Elimina una cantidad específica de un producto del carrito.
- **Cuerpo de la Solicitud:**

```json
{
  "quantity": 1
}
```
- **Ejemplo de Uso:**

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "quantity": 1
}' "http://localhost:8080/api/carts/remove/66b1537cf0d705fa5595d5cf"
```

### Vaciar el Carrito

- **Endpoint:** \`/api/carts/clear\`
- **Método:** \`POST\`
- **Descripción:** Vacía todo el carrito de compras.
- **Ejemplo de Uso:**

```bash
curl -X POST "http://localhost:8080/api/carts/clear"
```

## 📝 Sobre el Proyecto

Este proyecto de Ecommerce está diseñado para proporcionar una plataforma básica donde los usuarios pueden gestionar productos y carritos de compra. Utiliza **Node.js** y **Express** para el servidor, **MongoDB** para la base de datos y **Handlebars** para las vistas. El proyecto también incluye funcionalidades en tiempo real usando **Socket.IO**, lo que permite que los cambios en los productos y carritos se reflejen inmediatamente en la interfaz de usuario.

### 🛠️ Funcionalidades Clave

- **Gestión de Productos:** Crear, leer, actualizar y eliminar productos.
- **Gestión de Carritos:** Agregar productos al carrito, eliminar productos del carrito y vaciar el carrito.
- **Actualización en Tiempo Real:** Los cambios en los productos y carritos se reflejan en tiempo real en la interfaz de usuario.
- **Paginación y Filtrado:** Soporte para paginación, filtrado y ordenamiento de productos.

Esperamos que este proyecto sirva como una base sólida para desarrollar una plataforma de comercio electrónico más completa y personalizada.

---

### 🎉 ¡Muchas gracias por llegar hasta aquí! 🎉

---
