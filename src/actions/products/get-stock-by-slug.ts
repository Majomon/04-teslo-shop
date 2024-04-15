"use server";

import { prisma } from "@/lib/prisma";

export const getStockBySlug = async (slug: string): Promise<number> => {
  try {
    const stock = await prisma.product.findFirst({
      where: { slug: slug },
      //   El campo que me voy a traer
      select: { inStock: true },
    });

    return stock?.inStock || 0;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener producto por Slug");
  }
};
