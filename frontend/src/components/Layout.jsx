import { useState, useEffect } from "react";

import Main from "./Main";
import Modal from "./Modal";

const Layout = () => {
  const [modal, setModal] = useState(false);
  const [cliente, setCliente] = useState({});
  const [clientes, setClientes] = useState([]);

  const obtenerClientes = async () => {
    try {
      const url = "http://localhost:8000/get_clients";
      const req = await fetch(url);

      if (req.status) {
        const res = await req.json();
        await res.sort((a, b) => {
          if (a.apellido < b.apellido) return -1;
        });
        setClientes(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    obtenerClientes();
  }, []);

  return (
    <>
      <header>
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="/" className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Registro Clientes
              </span>
            </a>
            <div className="flex md:order-2">
              <button
                onClick={() => setModal(true)}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Nuevo Cliente
              </button>
            </div>
          </div>
        </nav>
      </header>

      <Main
        setCliente={setCliente}
        setModal={setModal}
        clientes={clientes}
        obtenerClientes={obtenerClientes}
      />
      {modal && (
        <Modal
          cliente={cliente}
          setCliente={setCliente}
          setModal={setModal}
          obtenerClientes={obtenerClientes}
        />
      )}
    </>
  );
};

export default Layout;
