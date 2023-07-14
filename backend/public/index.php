<?php

include_once __DIR__ . "./../config/app.php";


use Uff\Router as Router;
use Uff\Cors;
use Controllers\AppController;



$whitelist = ['http://localhost:5173'];
Cors::setCors($whitelist); // Los cors solo estan habilitados para escrituras. Para inhabilitar la lectura es preferible agregar un middleware
Cors::cors(); // Habilitar linea para uso con frontend

$router = new Router();

$router->get('/get_clients', [AppController::class, 'get_clients']);
$router->post("/create_client", [AppController::class, 'create_client']);
$router->put("/update_client/:dni", [AppController::class, 'update_client']);
$router->delete("/delete_client/:dni", [AppController::class, 'delete_client']);


$router->listen('404.php');
