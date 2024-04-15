import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function POST(request: Request) {
  const { name, email, image } = await request.json();

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      image,
    },
  });

  return NextResponse.json(newUser);
}
