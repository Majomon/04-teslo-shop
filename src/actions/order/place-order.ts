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
  productsIds: ProductToOrder[],
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
        in: productsIds.map((p) => p.productId),
      },
    },
  });

  //   Calcular los montos
  const itemsInOrder = productsIds.reduce((count, p) => count + p.quantity, 0);

  //   Los totales de tax, subTotal y total
  const { subTotal, tax, total } = productsIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((product) => product.id === item.productId);

      if (!product) throw new Error(`${item.productId} no existe - 500`);

      const subTotal = product.price * productQuantity;

      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 },
  );
};
