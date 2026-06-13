export type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
};


export type Room = {
  id: string;
  title: string;
  location: string;
  price: number;
  image: string;
  description: string;

  bedrooms: number;
  bathrooms: number;
  size: number;

  furnished: boolean;
  wifi: boolean;
  parking: boolean;
  electricityIncluded: boolean;
  waterIncluded: boolean;
  petsAllowed: boolean;

  // NEW FLEXIBLE LIVING FEATURES (optional per room)
  kitchen?: boolean;
  kitchenType?: string;

  diningArea?: boolean;
  livingRoom?: boolean;
  balcony?: boolean;

  security?: string;
  parkingType?: string;
  internetSpeed?: string;

  smokingAllowed?: boolean;
  noiseRule?: string;

  propertyType: string;
  availableFrom: string;
  deposit: number;
  leaseTerm: string;

  reportCount: number;
  reviews: Review[];
};