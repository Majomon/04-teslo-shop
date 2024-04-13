import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];
export default function CartPage() {
  return (
    <div className="mb-72 flex items-center justify-center px-10 sm:px-0">
      <div className="flex w-[1000px] flex-col">
        <Title title="Carrito" />
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {/* Carrito */}
          <div className="mt-5 flex flex-col">
            <span className="text-xl">Agregar más items</span>
            <Link href={"/"} className="mb-5 underline">
              Continúa comprando
            </Link>
          </div>

          {/* Items */}
          {productsInCart.map((product) => (
            <div key={product.slug} className="flex">
              <Image
                src={`/products/${product.images[0]}`}
                alt={product.title}
                width={100}
                height={100}
                className="mr-5 rounded"
              />
              <div>
                <p>{product.title}</p>
                <p>{product.price}</p>
                <QuantitySelector quantity={3} />
                <button className="mt-3 underline">Remover</button>
              </div>
            </div>
          ))}
          {/* Checkout */}
        </div>
      </div>
    </div>
  );
}
