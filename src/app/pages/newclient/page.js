"use client";

import Link from "next/link";

import "../../globals.css";
import "../../components/Styles_Forms.css";

export default function Newclient() {
  return (
    <div className="form-box w-[35vw] h-[50vh] ">
      <h2>NUEVO CLIENTE</h2>
      <form
        className="w-[80%]"
        action="login-form"
        onSubmit={(e) => {
          e.preventDefault();
          const name = document.getElementById("name-box").value;
          const direccion = document.getElementById("address-box").value;
          const cif = document.getElementById("cif-box").value;

          if (name == "" || direccion == "") {
            alert("ERROR: no se han introducido todos los datos necesarios");
          } else alert(`Se ha guardado el cliente ${name}`);

          /*LoginPostRequest(email, password).then((success) => {
            if (success) {
              router.push("/pages/main");
            } else {
              alert("El correo o la contraseña no son correctos");
            }
          }); */
        }}
      >
        <br />
        <div>
          <label htmlFor="name-box">Cliente / Empresa:</label>
          <input type="text" id="name-box" name="name" />
        </div>
        <div>
          <label htmlFor="address-box">Dirección de facturación:</label>
          <input type="text" id="address-box" name="address" />
        </div>
        <div>
          <label htmlFor="cif-box">CIF:</label>
          <input
            type="number"
            min="10000000"
            max="99999999"
            id="cif-box"
            name="cif"
          />
        </div>
        <div className="flex flex-row justify-between">
          <Link href="../pages/main">
            <button className="bg-red-500 text-white font-bold py-2 px-4 rounded">
              Discard
            </button>
          </Link>
          <Link href="../pages/main">
            <button
              type="submit"
              className="bg-green-500 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
