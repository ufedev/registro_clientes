/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Cliente from "./Cliente";

const Main = ({ setModal, setCliente, clientes, obtenerClientes }) => {
  const [filtro, setFiltro] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const resultadoFiltrado = clientes.filter((c) => {
      if (c?.dni.toString().startsWith(busqueda)) return c;
    });

    setFiltro(resultadoFiltrado);
  }, [busqueda]);
  return (
    <main className="bg-gradient-to-b from-slate-400 to-slate-700 flex flex-col gap-10 justify-center flex-1 items-center mt-14">
      <section className="max-w-[800px] min-w-[768px]">
        <form className="w-full">
          <label
            htmlFor="busqueda"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Buscar
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="busqueda"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Buscar DNI"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              required
            />
          </div>
        </form>
      </section>

      <section className="max-w-[800px] min-w-[768px]">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Cliente
                </th>
                <th scope="col" className="px-6 py-3">
                  DNI
                </th>
                <th scope="col" className="px-6 py-3">
                  Sexo
                </th>
                <th scope="col" className="px-6 py-3">
                  Telefono
                </th>

                <th scope="col" className="px-6 py-3">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {busqueda === ""
                ? clientes?.map((cliente) => (
                    <Cliente
                      key={cliente.id}
                      cliente={cliente}
                      setModal={setModal}
                      setCliente={setCliente}
                      obtenerClientes={obtenerClientes}
                    />
                  ))
                : filtro?.map((cliente) => (
                    <Cliente
                      key={cliente.id}
                      cliente={cliente}
                      setModal={setModal}
                      setCliente={setCliente}
                      obtenerClientes={obtenerClientes}
                    />
                  ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default Main;
