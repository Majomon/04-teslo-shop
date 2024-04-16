import { Title } from "@/components";
import Link from "next/link";
import { AdressForm } from "./ui/AdressForm";

export default function AddressPage() {
  return (
    <div className="mb-72 flex flex-col px-10 sm:items-center sm:justify-center sm:px-0">
      <div className="flex  w-full flex-col justify-center text-left xl:w-[1000px]">
        <Title title="Dirección" subTitle="Dirección de entrega" />

        <AdressForm />
      </div>
    </div>
  );
}
