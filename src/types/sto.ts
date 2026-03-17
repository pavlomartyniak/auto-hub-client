// types/sto.ts
export interface STO {
  id: string;
  name: string;
  slug: string;
  description: string;
  address: {
    city: string;
    district?: string;
    street: string;
    house: string;
  };
  phones: string[];
  email?: string;
  website?: string;
  social?: Record<string, string>;
  workingHours: Record<string, string>;
  services: Array<{
    id: string;
    name: string;
    priceFrom: number;
    priceTo?: number;
    durationMinutes: number;
    description?: string;
  }>;
  brands: string[];
  certificates?: Array<{ name: string; imageUrl: string; issuedAt: string }>;
  photos: Array<{ id: string; url: string; alt: string; isMain: boolean }>;
  reviews: Array<{
    id: string;
    author: string;
    rating: number;
    text: string;
    createdAt: string;
    carModel?: string;
  }>;
  averageRating: number;
  reviewCount: number;
  isVerified: boolean;
  isPartner: boolean;
  availableSlots?: string[];
  createdAt: string;
  updatedAt: string;
}
