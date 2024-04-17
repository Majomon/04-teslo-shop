"use client";

import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat, sleep } from "@/utils";
import clsx from "clsx";
import { useEffect, useState } from "react";

export const PlaceOrder = () => {
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const address = useAddressStore((state) => state.address);
  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation(),
  );
  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));
    // await sleep(2);
    setIsPlacingOrder(false);
  };

  if (!loaded) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="rounded-xl bg-white p-7 shadow-xl">
      <h2 className="mb-2 text-2xl font-bold">Dirección de entrega</h2>
      <div className="mb-6">
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>

      {/* Divider */}
      <div className="mb-6 h-0.5 w-full rounded bg-gray-200" />

      <h2 className="mb-2 text-2xl">Resumen de orden</h2>
      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">
          {itemsInCart === 1 ? "1 Artículo" : `${itemsInCart} Artículos`}
        </span>
        <span>Sub. Total</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>
        <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>
        <span className="mt-5 text-2xl">Total:</span>
        <span className="mt-5 text-right text-2xl">
          {currencyFormat(total)}
        </span>
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

        {/* <p className="text-red-500">Error de creación</p> */}

        <button
          onClick={onPlaceOrder}
          className={clsx({
            "btn-primary": !isPlacingOrder,
            "btn-disabled": isPlacingOrder,
          })}
          //   href={"/orders/123"}
        >
          Colocar orden
        </button>
      </div>
    </div>
  );
};
