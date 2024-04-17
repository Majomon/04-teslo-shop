import { Title } from "@/components";
import Image from "next/image";
import Link from "next/link";
import { ProductsInCartCheckout } from "./ui/ProductsInCartCheckout";
import { PlaceOrder } from "./ui/PlaceOrder";

export default function CheckoutPage() {
  return (
    <div className="mb-72 flex items-center justify-center px-10 sm:px-0">
      <div className="flex w-[1000px] flex-col">
        <Title title="Verificar orden" />
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {/* Carrito */}
          <div className="mt-5 flex flex-col">
            <span className="text-xl">Ajustar elementos</span>
            <Link href={"/cart"} className="mb-5 underline">
              Editar carrito
            </Link>

            {/* Items */}
            <ProductsInCartCheckout />
          </div>

          {/* Checkout - Resumen*/}
          <PlaceOrder />
        </div>
      </div>
    </div>
  );
}
