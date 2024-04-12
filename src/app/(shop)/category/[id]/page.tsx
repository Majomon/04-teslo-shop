import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export default function CheckoutPage({ params }: Props) {
  const { id } = params;

  if (id === "kids") {
    notFound();
  }
  return (
    <div>
      <h1>
        Category Page <span className="capitalize">{id}</span>
      </h1>
    </div>
  );
}
