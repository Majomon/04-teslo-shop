"use server";

import { prisma } from "@/lib/prisma";

export const deleteUserAddress = async (userId: string) => {
  try {
    const user = await prisma.userAddress.deleteMany({
      where: {
        userId,
      },
    });
    return { ok: true };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo grabar la dirección",
    };
  }
};
