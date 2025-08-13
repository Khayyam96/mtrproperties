export type Property = {
  id: number;
  name: string;
  price: number;
  type: "Apartment" | "Villa" | "Commercial";
  purpose: "Buy" | "Rent";
  bedrooms: number;
  bathrooms: number;
  area: number;
  furnished: boolean;
  locationName: string;
  lat: number;
  lng: number;
  image: string;
  createdAt: string;
};

export const properties: Property[] = [
  {
    id: 1, name: "Downtown One", price: 3250000, type: "Apartment", purpose: "Buy",
    bedrooms: 2, bathrooms: 2, area: 1200, furnished: true, locationName: "Downtown Dubai",
    lat: 25.1976, lng: 55.2754, image: "/inner2.png", createdAt: "2025-08-01"
  },
  {
    id: 2, name: "Business Bay View", price: 950000, type: "Apartment", purpose: "Rent",
    bedrooms: 2, bathrooms: 2, area: 1100, furnished: true, locationName: "Business Bay",
    lat: 25.1852, lng: 55.2722, image: "/inner2.png", createdAt: "2025-07-28"
  },
  {
    id: 3, name: "Canal Heights", price: 480000, type: "Apartment", purpose: "Buy",
    bedrooms: 1, bathrooms: 1, area: 780, furnished: false, locationName: "Dubai Canal",
    lat: 25.2055, lng: 55.2661, image: "/inner2.png", createdAt: "2025-07-20"
  },
  {
    id: 4, name: "Old Town Suite", price: 620000, type: "Apartment", purpose: "Rent",
    bedrooms: 1, bathrooms: 1, area: 820, furnished: true, locationName: "Old Town",
    lat: 25.1918, lng: 55.279, image: "/inner2.png", createdAt: "2025-07-12"
  },
  {
    id: 5, name: "Burj Khalifa Area", price: 1250000, type: "Apartment", purpose: "Buy",
    bedrooms: 3, bathrooms: 3, area: 1600, furnished: false, locationName: "Burj Area",
    lat: 25.1972, lng: 55.2744, image: "/inner2.png", createdAt: "2025-06-30"
  },
  {
    id: 6, name: "Executive Bay", price: 4200000, type: "Villa", purpose: "Buy",
    bedrooms: 4, bathrooms: 4, area: 3200, furnished: true, locationName: "Business Bay",
    lat: 25.1812, lng: 55.269, image: "/inner2.png", createdAt: "2025-06-18"
  },
  {
    id: 7, name: "Canal Edge", price: 700000, type: "Apartment", purpose: "Rent",
    bedrooms: 2, bathrooms: 2, area: 1050, furnished: false, locationName: "Dubai Canal",
    lat: 25.203, lng: 55.263, image: "/inner2.png", createdAt: "2025-06-10"
  },
  {
    id: 8, name: "Downtown Studio", price: 350000, type: "Apartment", purpose: "Buy",
    bedrooms: 1, bathrooms: 1, area: 520, furnished: true, locationName: "Downtown Dubai",
    lat: 25.195, lng: 55.277, image: "/inner2.png", createdAt: "2025-05-22"
  }
];
