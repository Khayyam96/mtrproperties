import { TProperty } from "@/types/property";

const toSlug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const base: Omit<TProperty, "id" | "slug"> = {
  images: ["/cardimg.png", "/cardimg.png", "/cardimg.png"],
  name: "Santa Fe Residences",
  price: 3250000,
  type: "Apartment",
  bedrooms: 2,
  bathrooms: 3,
  area: 1600,
  location: "Palm Jumeirah, Dubai",
  isReadyToMove: true,
  isOffPlan: true,
  description:
    "Premium sea-view apartments with modern amenities and excellent connectivity.",
  amenities: ["Pool", "Gym", "Covered Parking", "24/7 Security"],
};

export const properties: TProperty[] = Array.from({ length: 36 }).map((_, i) => {
  const name = i % 3 === 0 ? "Santa Fe Residences"
            : i % 3 === 1 ? "Marina Heights"
            : "Palm Bay Tower";
  const withName = { ...base, name };
  return {
    ...withName,
    id: String(i + 1),
    slug: `${toSlug(withName.name)}-${i + 1}`,
    price: withName.price + i * 10000,
    bedrooms: withName.bedrooms + (i % 2),
    area: withName.area + (i * 10),
  };
});

export const findPropertyBySlug = (slug: string) =>
  properties.find((p) => p.slug === slug);



