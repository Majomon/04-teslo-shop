"use client";

import { useCartStore } from "@/store";
import { useEffect, useState } from "react";

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false);
  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation(),
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <p>Espere...</p>;

  return (
    <div className="grid grid-cols-2">
      <span>No. Productos</span>
      <span className="text-right">
        {itemsInCart === 1 ? "1 Artículo" : `${itemsInCart} Artículos`}
      </span>
      <span>Sub. Total</span>
      <span className="text-right">{subTotal}</span>
      <span>Impuestos (15%)</span>
      <span className="text-right">{tax}</span>
      <span className="mt-5 text-2xl">Total:</span>
      <span className="mt-5 text-right text-2xl">{total}</span>
    </div>
  );
};
