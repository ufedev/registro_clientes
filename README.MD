# Sistema de registro de clientes.

## Backend PHP

Para que el backend funcione se debe habilitar el mod 'mysqli' en php.ini

- Para servirlo en apache contiene el .htaccess
- Para probar endpoints ir '/backend/public/index.php' y eliminar **_Cors::cors();_**

```php
<?php

include_once __DIR__ . "./../config/app.php";


use Uff\Router as Router;
use Uff\Cors;
use Controllers\AppController;



$whitelist = ['http://localhost:5173'];
Cors::setCors($whitelist); // Los cors solo estan habilitados para escrituras. Para inhabilitar la lectura es preferible agregar un middleware
Cors::cors(); // <-------- comentar para endpoints con PostMan

$router = new Router();

$router->get('/get_clients', [AppController::class, 'get_clients']);
$router->post("/create_client", [AppController::class, 'create_client']);
$router->put("/update_client/:dni", [AppController::class, 'update_client']);
$router->delete("/delete_client/:dni", [AppController::class, 'delete_client']);


$router->listen('404.php');

```

- Para arrancar el servicio con el servidor incluido en PHP para desarrollo, desde consola ingresar /backend/ y ejecutar:

```bash
cd backend \
php -S localhost:8000 -t public/
```

❗ El frontend esta configurado con esta IP como ruta base backend.

### Base de datos

- Para la base de datos

```bash
cd backend/config
```

- abrir env.php y modificar los datos necesarios

```php
<?php
const DB_HOST = 'localhost';
const DB_USER = 'root';
const DB_PASSWORD = 'root';
const DB_NAME = "registro_clientes";

```

❗**_La base de datos debe estar creada,_** **las tablas las crea el sistema.**

❗ **_Se incluye la DB como registro_clientes.sql_**

---

---

## Frontend React

**_Se utilizo Vite y Tailwindcss._**

- Para servir el front

```sh
cd frontend \
pnpm install \
pnpm run dev
```

- Se pueden cambiar las variables desde:

```bash
cd frontend/
code .env
```

hay una sola variable que es la ruta del backend

```env
VITE_BASE_URL='http://localhost:8000'
```

- El sistema de busquedas solo lo hace por DNI - Es en tiempo real. Los clientes estan ordenados alfabéticamente por el apellido

❗ Las busquedas son en tiempo real.
