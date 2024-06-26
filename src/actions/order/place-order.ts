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

  //   Los totales de tax, subTotal y total
  const { subTotal, tax, total } = productsId.reduce(
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

  //   Crear la transacción de la base de datos

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. Actualizar el stock de los productos
      const updatedProductsPromises = products.map((product) => {
        //  Acumular los valores
        const productQuantity = productsId
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => acc + item.quantity, 0);

        if (productQuantity === 0) {
          throw new Error(`${product.id}, no tiene cantidad definida.`);
        }

        return tx.product.update({
          where: {
            id: product.id,
          },
          data: {
            //   inStock: product.inStock - productQuantity, // No se debe hacer asi
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updateProducts = await Promise.all(updatedProductsPromises);

      // Verificar valores negativos en las existencia = no hay stock
      updateProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`${product.title} no tiene inventario suficiente.`);
        }
      });

      // 2. Crear el encabezado de la orden - Detalles
      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsInOrder,
          subTotal: subTotal,
          tax: tax,
          total: total,

          OrderItem: {
            createMany: {
              data: productsId.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });

      // 3. Crear la dirección de la orden
      const { country, ...restAddress } = address;

      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id,
        },
      });

      return {
        order: order,
        orderAddress: orderAddress,
        updateProducts: updateProducts,
      };
    });

    return { ok: true, order: prismaTx.order, prismaTx: prismaTx };
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message,
    };
  }
};
