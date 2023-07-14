/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const Modal = ({ cliente, setCliente, obtenerClientes, setModal }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [sexo, setSexo] = useState("");
  const [telefono, setTelefono] = useState("");

  useEffect(() => {
    const cargarCliente = async () => {
      if (Object.keys(cliente).length > 0) {
        setNombre(cliente?.nombre);
        setApellido(cliente?.apellido);
        setDni(cliente?.dni);
        setSexo(cliente?.sexo);
        setTelefono(cliente?.telefono);
      }
    };
    cargarCliente();
  }, []);

  const crearCliente = async () => {
    try {
      const url = `${import.meta.env.VITE_BASE_URL}/create_client`;
      const config = {
        method: "POST",
        body: JSON.stringify({ nombre, apellido, dni, sexo, telefono }),
      };
      const req = await fetch(url, config);
      if (req.ok) {
        Swal.fire({
          text: "Cliente Agregado",
          icon: "success",
        }).then(({ isConfirmed }) => {
          if (isConfirmed) {
            obtenerClientes();
            setModal(false);
          }
        });

        return;
      }
      const res = await req.json();

      const html = res.errors.reduce((acc, curr) => {
        acc += `<p class='block'>${curr}</p>`;
        return acc;
      }, "");

      Swal.fire({
        title: "Error",
        icon: "error",
        html: html,
      });
    } catch (e) {
      Swal.fire("Hubo un error");
    }
  };

  const actualizarCliente = async () => {
    try {
      const url = `${import.meta.env.VITE_BASE_URL}/update_client/${dni}`;
      const config = {
        method: "PUT",
        body: JSON.stringify({ nombre, apellido, sexo, telefono }),
      };
      const req = await fetch(url, config);
      if (req.ok) {
        Swal.fire({
          text: "Cliente Actualizado",
          icon: "success",
        }).then(({ isConfirmed }) => {
          if (isConfirmed) {
            obtenerClientes();
            setModal(false);
          }
        });

        return;
      }
      const res = await req.json();

      const html = res.errors.reduce((acc, curr) => {
        acc += `<p class='block'>${curr}</p>`;
        return acc;
      }, "");

      Swal.fire({
        title: "Error",
        icon: "error",
        html: html,
      });
    } catch (e) {
      Swal.fire("Hubo un error");
    }
  };

  return (
    <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center z-50 backdrop-blur-md">
      <div id="authentication-modal" tabIndex="-1" className=" w-full p-4">
        <div className="relative w-full max-w-md max-h-full mx-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal"
              onClick={() => {
                setModal(false);
                setCliente({});
              }}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Cerrar Modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                {cliente?.id ? "Modificar Cliente" : "Agregar Nuevo Cliente"}
              </h3>
              <form
                className="space-y-6"
                action="#"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (cliente?.id) {
                    actualizarCliente();
                  } else {
                    crearCliente();
                  }
                }}
              >
                <div>
                  <label
                    htmlFor="nombre"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nombre cliente
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Alberto"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="apellido"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Apellido cliente
                  </label>
                  <input
                    type="text"
                    name="apellido"
                    id="apellido"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Rodriguez"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="dni"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    DNI
                  </label>
                  <input
                    type="number"
                    name="dni"
                    id="dni"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="33xxxxxxx"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="telefono"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Telefono
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    id="telefono"
                    value={telefono}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="sin 0 ni 15 '3422445588'"
                    onChange={(e) => setTelefono(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="sexo"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    onChange={(e) => setSexo(e.target.value)}
                    value={sexo}
                    required
                  >
                    <option value="">--Seleccione Sexo---</option>
                    <option value="F">Femenino</option>
                    <option value="M">Masculino</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {cliente?.id ? "Actualizar" : "Agregar"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
