<?php

$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);


if ($conn->connect_errno) {
    die("Hubo un error al conectarse a la base de datos" . $conn->connect_error);
}
