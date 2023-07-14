<?php


namespace Models;

use Exception;
use mysqli;
use TypeError;

final class Clients
{
    public static string $table = "clientes";
    public static array $columns = ['id', 'dni', 'nombre', 'apellido', 'sexo', 'telefono'];
    public static array $errors = [];
    public ?int $id = null;
    public ?int $dni;
    public ?string $nombre;
    public ?string $apellido;
    public ?string $telefono;
    public ?string $sexo;
    private static mysqli $db;


    public function __construct($args = [])
    {

        $this->dni = $args['dni'] ?? null;
        $this->nombre = $args['nombre'] ?? null;
        $this->apellido = $args['apellido'] ?? null;
        $this->telefono = $args['telefono'] ?? null;
        $this->sexo = $args['sexo'] ?? null;
    }

    public static function set_db(mysqli $db): void
    {
        self::$db = $db;
    }
    private static function create_table(): void
    {

        $qry = "CREATE TABLE IF NOT EXISTS " . self::$table;
        $qry .= " ( id int(11) NOT NULL AUTO_INCREMENT, dni char(9) UNIQUE, nombre varchar(30), apellido varchar(30), sexo char(1), telefono varchar(12), primary key (id))";
        self::$db->query($qry);
    }
    private function clear_data(): array
    {
        $clear_data = [];
        foreach (self::$columns as $column) {
            if ($column === 'id') continue;
            $clear_data[$column] = htmlspecialchars($this->$column ?? "");
        }

        return $clear_data;
    }

    private static function create_obj(array $result): self
    {
        $obj = new self();
        foreach (self::$columns as $column) {
            $obj->$column = $result[$column];
        }
        return $obj;
    }
    public function validate()
    {
        self::$errors = [];

        foreach ($this->clear_data() as $key => $value) {

            if (!is_string($value)) {
                self::$errors[] = mb_convert_encoding("El tipo de dato ingresado en " . $key . " es incorrecto", "UTF-8");
                continue;
            }


            if ($key === "telefono") {
                $len = strlen($value ?? "");
                if ($len > 12 || $len < 10) { // con o sin código país
                    self::$errors[] = mb_convert_encoding("Debe colocar un telefono válido", 'UTF-8');
                }
            } elseif ($key === 'sexo') {
                if ($value === "M" || $value === "F") {
                    continue;
                } else {
                    self::$errors[] = mb_convert_encoding("Debe seleccionar un sexo válido", 'UTF-8');
                }
            } elseif ($key === 'dni') {
                $dnilen = strlen($value ?? "");
                if ($dnilen > 8 || $dnilen < 7) { // para personas mayores y para nuevos DNI de 8 digitos
                    self::$errors[] = mb_convert_encoding("Debe proporcionar un DNI válido", "UTF-8");
                }
            } else {
                if (!$value) {
                    self::$errors[] = mb_convert_encoding('Debe completar el ' . $key, "UTF-8");
                } elseif (strlen($value) < 3 and $key !== "sexo") {
                    self::$errors[] = mb_convert_encoding("El campo " . $key . " es demasiado corto", "UTF-8");
                    continue;
                }
            }
        }



        return self::$errors;
    }

    public function save(): string | bool
    {
        $this->create_table();

        if ($this->id) {
            return $this->update();
        }
        return $this->insert();
    }
    public static function find_one(array $data): ?self
    {

        $key = array_keys($data);
        $key = array_shift($key);
        $value = $data[$key];

        $qry = "SELECT * FROM " . self::$table . " WHERE " . $key . " = ? LIMIT 1";
        $stmt = self::$db->prepare($qry);
        $stmt->bind_param('s', $value);
        $stmt->execute();

        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            return self::create_obj($result->fetch_assoc());
        }
        return null;
    }
    public static function find(): array
    {
        self::create_table();

        $clientes = [];
        $qry = "SELECT * FROM " . self::$table;
        $result = self::$db->query($qry);
        while ($r = $result->fetch_assoc()) { // traemos todos los clientes
            $clientes[] = self::create_obj($r);
        }
        return $clientes ?? [];
    }
    private function insert(): bool
    {
        foreach ($this->clear_data() as $key => $value) {
            $$key = $value;
        }
        $qry = "insert into " . self::$table . " (dni,nombre,apellido,sexo,telefono) values (?,?,?,?,?)";

        $stmt = self::$db->prepare($qry);
        $stmt->bind_param('sssss', $dni, $nombre, $apellido, $sexo, $telefono);
        return $stmt->execute();
    }
    public function sync(array | self $args = []): void
    {
        foreach ($args as $key => $value) {
            if (property_exists($this, $key) && ($key !== 'id' || $key !== "dni")) {
                $this->$key = htmlspecialchars($value);
            }
        }
    }
    private function update(): bool
    {


        $qry = "UPDATE " . self::$table . " set nombre=?, apellido=?, sexo=?, telefono=? WHERE id = " . $this->id;
        $stmt = self::$db->prepare($qry);
        $stmt->bind_param("ssss", $this->nombre, $this->apellido, $this->sexo, $this->telefono);

        return $stmt->execute();
    }
    public function delete(): string
    {
        $qry = "DELETE FROM " . self::$table . " WHERE id=" . $this->id;
        $result = self::$db->query($qry);
        return $result;
    }
}
