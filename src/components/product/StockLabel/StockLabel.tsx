"use client";
import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isloading, setIsloading] = useState(true);
  useEffect(() => {
    getStock();
  }, []);

  const getStock = async () => {
    const inStock = await getStockBySlug(slug);
    setStock(inStock);
  };

  return (
    <h2 className={`${titleFont.className} text-lg font-bold antialiased`}>
      {/* Stock: {product.inStock} */}
      Stock:{stock}
    </h2>
  );
};
