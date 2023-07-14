<?php

namespace Controllers;

use Exception;
use Uff\Res;
use Models\Clients;
use TypeError;

final class AppController
{
    public static function get_clients($req, Res $res): void
    {
        $clientes = Clients::find();
        $res->json($clientes);
    }
    public static function create_client($req, Res $res): void
    {
        try {
            $cliente = $req->body;
            // Si no está- crearlo.
            $nuevo = new Clients($cliente);
            // Válida los datos del form
            $errors = $nuevo->validate();
            if (!empty($errors)) {
                $res->status(422)->json(["errors" => $errors]);
            }


            $status = $nuevo->save();
            if (!$status) {
                $res->status(403)->json(["errors" => ['Hubo un error al intentar crear el cliente']]);
            }
            $res->json(["msj" => "Cliente Creado"]);
        } catch (TypeError $e) {
            $res->status(422)->json(["errors" => ["Hubo un error en los datos ingresados."]]);
        } catch (Exception $b) {
            $res->status(422)->json(["errors" => ["El cliente ya se encuentra registrado."]]);
        }
    }

    public static function update_client($req, Res $res): void
    {
        try {

            $dni = $req->params;
            $cliente_actualizado = $req->body;

            // Si no está- crearlo.
            $cliente = Clients::find_one($dni);
            if (!$cliente) $res->status(404)->json(["errors" => ["No encontrado"]]);

            $cliente->sync($cliente_actualizado);
            // Válida los datos del form
            $errors = $cliente->validate();
            if (!empty($errors)) {
                $res->status(422)->json(["errors" => $errors]);
            }


            $status = $cliente->save();

            if (!$status) {
                $res->status(403)->json(["errors" => ["hubo un error al actualizar"]]);
            }
            $res->json(["msj" => "Cliente Actualizado"]);
        } catch (TypeError $e) {
            $res->status(422)->json(["errors" => ["Hubo un error en los datos ingresados."]]);
        }
    }
    public static function delete_client($req, Res $res): void
    {
        try {
            $dni = $req->params;

            $cliente = Clients::find_one($dni);
            if (!$cliente) $res->status(404)->json(["errors" => ["cliente no encontrado"]]);

            $result = $cliente->delete();

            if ($result) $res->json(['msj' => "cliente eliminado"]);

            $res->status(403)->json(["errors" => ["Hubo un error al intentar eliminar el cliente"]]);
        } catch (Exception $e) {

            $res->status(422)->json(["errors" => ["Hubo un error"]]);
        }
    }
}
