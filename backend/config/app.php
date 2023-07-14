<?php

include_once "env.php";
include_once "db.php";
include_once __DIR__ . "./../vendor/autoload.php";

Models\Clients::set_db($conn);
