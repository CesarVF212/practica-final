import Image from "next/image";

export default function LogoBig() {
  return (
    <div>
      <Image
        id="logoImage"
        src="/logo.png"
        alt="Logo de la aplicación"
        width={500}
        height={200}
      />
    </div>
  );
}
