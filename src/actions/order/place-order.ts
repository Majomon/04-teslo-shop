"use server";

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";
import { prisma } from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productsId: ProductToOrder[],
  address: Address,
) => {
  const session = await auth();
  const userId = session?.user.id;

  //   Verificar sesión de usuario
  if (!userId) {
    return { ok: false, message: "No hay sesión de usuario" };
  }

  //   Obtener la información de los productos
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productsId.map((p) => p.productId),
      },
    },
  });

  //   Calcular los montos  // Encabezado
  const itemsInOrder = productsId.reduce((count, p) => count + p.quantity, 0);
  console.log(itemsInOrder);
};
