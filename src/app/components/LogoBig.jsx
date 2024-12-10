import Image from "next/image";

export default function LogoBig() {
  return (
    <div>
      <Image id="logoImage" src="/logo.png" alt="" width={500} height={200} />
    </div>
  );
}
