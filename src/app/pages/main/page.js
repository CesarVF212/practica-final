"use client";

import GridElements from "@/app/components/GridElements";
import Latbar from "@/app/components/Latbar";

import "../../globals.css";

const clients = [
  { name: "Telefonica", Domicilio: "Alameda de San Anton 9", CIF: 3237213712 },
  { name: "Vodafone", Domicilio: "Alameda de San Anton 9", CIF: 3237213712 },
];

export default function Main() {
  return (
    <div>
      <Latbar></Latbar>
      <GridElements elements={clients}></GridElements>
    </div>
  );
}
