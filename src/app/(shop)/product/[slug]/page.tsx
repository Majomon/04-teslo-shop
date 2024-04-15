export const revalidate = 604800;

import { getProductBySlug } from "@/actions";
import {
  ProductMobileSlideShow,
  ProductSlideShow,
  QuantitySelector,
  SizeSelector,
  StockLabel,
} from "@/components";
import { titleFont } from "@/config/fonts";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mb-20 mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
      {/* SlideShow */}
      <div className="col-span-1 md:col-span-2">
        {/* Mobile SlideShow */}
        <ProductMobileSlideShow
          title={product.title}
          images={product.images}
          className="block sm:hidden"
        />
        {/* Desktop SlideShow */}
        <ProductSlideShow
          title={product.title}
          images={product.images}
          className="hidden sm:block"
        />
      </div>
      {/* Detalles */}
      <div className="col-span-1 px-5">
        <StockLabel slug={product.slug} />
        <h1 className={`${titleFont.className} text-xl font-bold antialiased`}>
          {product.title}
        </h1>
        <p className="mb-5 text-lg ">${product.price}</p>
        {/* Selector de tallas */}
        <SizeSelector
          selectedSize={product.sizes[0]}
          availableSizes={product.sizes}
        />
        {/* Selector de cantidad */}
        <QuantitySelector quantity={2} />
        {/* Boton */}
        <button className="btn-primary my-5">Agregar al carrito</button>

        {/* Descripción */}
        <h3 className="text-sm font-bold">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
