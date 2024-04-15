import { prisma } from "../lib/prisma";
import { initialData } from "./seed";

async function main() {
  // 1. Borrar registros previos
  await Promise.all([
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ]);

  // 2. Crear categorias
  const { categories, products } = initialData;
  const categoriesData = categories.map((category) => ({
    name: category,
  }));
  await prisma.category.createMany({
    data: categoriesData,
  });

  const categoriesDB = await prisma.category.findMany();

  const categoriesMap = categoriesDB.reduce(
    (map, category) => {
      map[category.name.toLowerCase()] = category.id;
      return map;
    },
    {} as Record<string, string>, // <string=shirt, string=categoryId>
  );
  console.log(categoriesMap);

  /*   await prisma.category.create({
    data: {
      name: "Shirts",
    },
  }); */

  console.log("Ejecutado correctamente");
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
