/* eslint-disable react/prop-types */

import Swal from "sweetalert2";
const Cliente = ({ cliente, setCliente, setModal, obtenerClientes }) => {
  const { nombre, apellido, dni, sexo, telefono } = cliente;
  const handleRemove = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Advertencia",
      text: "Desea remover este cliente?",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "red",
    }).then(async ({ isConfirmed }) => {
      if (isConfirmed) {
        try {
          const url = `${import.meta.env.VITE_BASE_URL}/delete_client/${dni}`;

          const req = await fetch(url, {
            method: "DELETE",
          });

          if (req.ok) {
            Swal.fire({
              title: "Eliminado",
              timer: 1000,
            });
            obtenerClientes();
          }
          console.log(url);
        } catch (e) {
          Swal.fire("Hubo un error");
        }
      }
    });
  };
  return (
    <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {apellido}, {nombre}
      </th>

      <td className="px-6 py-4">{dni}</td>
      <td className="px-6 py-4">{sexo}</td>
      <td className="px-6 py-4">{telefono}</td>
      <td className="px-6 py-4 flex gap-5">
        <button
          onClick={() => {
            setCliente(cliente);
            setModal(true);
          }}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Editar
        </button>
        <button
          onClick={handleRemove}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Remover
        </button>
      </td>
    </tr>
  );
};

export default Cliente;
