import { notFound } from "next/navigation";
import PropertyInner from "./property-inner";
import { findPropertyBySlug, properties } from "@/data/properties";

export async function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}


type Props = { params: { slug: string } };

export default function PropertyPage({ params }: Props) {
  const item = findPropertyBySlug(params.slug);
  if (!item) return notFound();
  return <PropertyInner property={item} />;
}
