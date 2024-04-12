import { titleFont } from "@/config/fonts";

export default function Home() {
  return (
    <div>
      <h1>Hola</h1>
      <h1 className={`${titleFont.className} font-bold`}>Hola mundo</h1>
      <h1 className={`${titleFont.className}`}>Hola mundo</h1>
    </div>
  );
}
