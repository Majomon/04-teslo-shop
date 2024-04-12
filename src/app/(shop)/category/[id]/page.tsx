import { Title } from "@/components";
import { ProductGrid } from "@/components/products/ProductGrid/ProductGrid";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

const seedProducts = initialData.products;

interface Props {
  params: { id: Category };
}

export default function CheckoutPage({ params }: Props) {
  const { id } = params;

  // if (id === "kids") {
  //   notFound();
  // }
  const products = seedProducts.filter((product) => product.gender === id);
  const labels: Record<Category, string> = {
    men: "para Hombres",
    women: "para Mujeres",
    kid: "para Niños",
    unisex: "para Todos",
  };
  return (
    <div>
      <Title
        title={`Artículos ${labels[id]}`}
        subTitle={`Productos de: ${id}`}
        className="mb-2"
      />
      <ProductGrid products={products} />
    </div>
  );
}
