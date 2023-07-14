/* eslint-disable react/prop-types */
import Cliente from "./Cliente"

const Lista = ({ clientes, setModal, setCliente, obtenerClientes }) => {
  if (clientes?.length === 0) {
    return (
      <tbody className="flex justify-center w-full ">
        <th className="py-2 text-slate-900">No hay nada por aqui...</th>
      </tbody>
    )
  }

  return clientes?.map((cliente) => (
    <Cliente
      key={cliente.id}
      cliente={cliente}
      setModal={setModal}
      setCliente={setCliente}
      obtenerClientes={obtenerClientes}
    />
  ))
}

export default Lista
