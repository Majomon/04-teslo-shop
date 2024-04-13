import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  params: {
    id: string;
  };
}
export default function OrdersIdPage({ params }: Props) {
  const { id } = params;

  return (
    <div className="mb-72 flex items-center justify-center px-10 sm:px-0">
      <div className="flex w-[1000px] flex-col">
        <Title title={`Orden #${id}`} />
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {/* Carrito */}
          <div className="mt-5 flex flex-col">
            <div
              className={clsx(
                "mb-5 flex items-center rounded-lg px-3.5 py-2 text-xs font-bold text-white",
                {
                  "bg-red-500": false,
                  "bg-green-700": true,
                },
              )}
            >
              <IoCartOutline size={30} />
              {/* <span className="mx-2">Pendiente</span> */}
              <span className="mx-2">Pagada</span>
            </div>
            {/* Items */}
            {productsInCart.map((product) => (
              <div key={product.slug} className="mb-5 flex">
                <Image
                  src={`/products/${product.images[0]}`}
                  alt={product.title}
                  width={100}
                  height={100}
                  className="mr-5 rounded"
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                />
                <div>
                  <p>{product.title}</p>
                  <p>{product.price} x 3</p>
                  <p className="font-bold">Subtotal: ${product.price * 3}`</p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout - Resumen*/}
          <div className="rounded-xl bg-white p-7 shadow-xl">
            <h2 className="mb-2 text-2xl font-bold">Dirección de entrega</h2>
            <div className="mb-6">
              <p className="text-xl">Mauricio Monzón</p>
              <p>Av. Siempre Viva 123</p>
              <p>Col. Centro</p>
              <p>Casanova</p>
              <p>Buenos Aires</p>
              <p>CP: 1665</p>
              <p>123.123.123</p>
            </div>

            {/* Divider */}
            <div className="mb-6 h-0.5 w-full rounded bg-gray-200" />

            <h2 className="mb-2 text-2xl">Resumen de orden</h2>
            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">3 articulos</span>
              <span>Sub. Total</span>
              <span className="text-right">$100</span>
              <span>Impuestos (15%)</span>
              <span className="text-right">$100</span>
              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-right text-2xl">$100</span>
            </div>
            <div className="mb-2 mt-5 w-full">
              <div
                className={clsx(
                  "mb-5 flex items-center rounded-lg px-3.5 py-2 text-xs font-bold text-white",
                  {
                    "bg-red-500": false,
                    "bg-green-700": true,
                  },
                )}
              >
                <IoCartOutline size={30} />
                {/* <span className="mx-2">Pendiente</span> */}
                <span className="mx-2">Pagada</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
