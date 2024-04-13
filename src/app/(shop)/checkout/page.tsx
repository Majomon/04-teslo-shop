import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];
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
              <p className="mb-5">
                {/* Disclaimer */}
                <span className="text-xs">
                  Al hacer click en {'"Colocar orden"'}, aceptas nuestros{" "}
                  <a href="#" className="underline">
                    términos y condiciones
                  </a>{" "}
                  y{" "}
                  <a href="#" className="underline">
                    política de privacidad
                  </a>
                </span>
              </p>
              <Link
                className="btn-primary flex justify-center"
                href={"/orders/123"}
              >
                Colocar orden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
