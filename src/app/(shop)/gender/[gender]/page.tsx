export const revalidate = 60 // 60 segundos

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, Title } from "@/components";
import { ProductGrid } from "@/components/products/ProductGrid/ProductGrid";
import { initialData } from "@/seed/seed";
import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";

const seedProducts = initialData.products;

interface Props {
  params: { gender: string };
  searchParams: {
    page?: string;
  };
}

export default async function CategoryIdPage({ params, searchParams }: Props) {
  const { gender } = params;

  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({ page, gender: gender as Gender });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  const labels: Record<string, string> = {
    men: "para Hombres",
    women: "para Mujeres",
    kid: "para Niños",
    unisex: "para Todos",
  };

  // if (id === "kids") {
  //   notFound();
  // }

  return (
    <div>
      <Title
        title={`Artículos ${labels[gender]}`}
        subTitle={`Productos de: ${gender}`}
        className="mb-2"
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
