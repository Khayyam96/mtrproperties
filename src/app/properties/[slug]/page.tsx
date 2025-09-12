import { notFound } from "next/navigation";
import PropertyInner from "./property-inner";
import { findPropertyBySlug, properties } from "@/data/properties";

export async function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export default async function PropertyPage({params}: {params: Promise<{ slug: string }>}) {
   const { slug } = await params;

  const item = findPropertyBySlug(slug);
  if (!item) return notFound();
  return <PropertyInner property={item} />;
}
