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
  reviews: Review[];
  reportCount: number;
};