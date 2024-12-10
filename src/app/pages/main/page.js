"use client";

import GridElement from "@/app/components/GridElement";
import Latbar from "@/app/components/Latbar";

const elements = [
  { name: "Telefonica", Domicilio: "Alameda de San Anton 9", CIF: 3237213712 },
  { name: "Vodafone", Domicilio: "Alameda de San Anton 9", CIF: 3237213712 },
];

export default function Main() {
  return (
    <div>
      <Latbar></Latbar>
      <GridElement elements={elements}></GridElement>
    </div>
  );
}
