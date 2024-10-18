import { StaticImageData } from "next/image";
import image1 from "../public/product1.jpg";
import image2 from "../public/product2.jpg";
import image3 from "../public/product3.jpeg";
import image4 from "../public/product4.webp";
import image5 from "../public/product5.webp";
import image6 from "../public/product6.webp";
import image7 from "../public/product7.jpeg";
import image8 from "../public/product8.jpeg";

export interface ProductProp {
  id: number;
  category: string;
  title: string;
  price: number;
  image: StaticImageData;
  brand: string;
  Weight: string;
  sellerId: string;
  description?: string;
}

export interface ProductProps {
  _id: string;
  category: string;
  name: string;
  price: number;
  discountPrice: string;
  image: string[];
  brand: string;
  Weight: string;
  description?: string;
  stock: number;
  createdAt: string;
}

export const product: ProductProp[] = [
  {
    id: 1,
    category: "Hair Treatment",
    title: "RedOne Matte Hair Wax",
    price: 65000,
    image: image1,
    brand: "RedOne",
    Weight: "0.45kg",
    sellerId: "1",
  },
  {
    id: 2,
    category: "Hair Treatment",
    title: "RedOne Aqua Hair Wax Full Force",
    price: 65000,
    image: image2,
    brand: "RedOne",
    Weight: "0.45kg",
    sellerId: "2",
  },
  {
    id: 3,
    category: "Hair Treatment",
    title: "Mielle Rosemary Scalp&Hair Strengthening Oil",
    price: 12500,
    image: image3,
    brand: "RedOne",
    Weight: "0.45kg",
    sellerId: "1",
  },
  {
    id: 4,
    category: "Conditioner, Hair Treatment",
    title: "Mielle Rosemary Mint Daily Styling Creme",
    price: 155000,
    image: image4,
    brand: "RedOne",
    Weight: "0.45kg",
    sellerId: "1",
  },
  {
    id: 5,
    category: "Conditioner, Hair Treatment",
    title: "Mielle Rosemary Mint Strengthening Leave-In Conditioner",
    price: 155000,
    image: image5,
    brand: "RedOne",
    Weight: "0.45kg",
    sellerId: "2",
  },
  {
    id: 6,
    category: " Hair Treatment",
    title: "Mielle Rosemary Mint Strengthening Hair Masque",
    price: 155000,
    image: image6,
    brand: "RedOne",
    Weight: "0.45kg",
    sellerId: "2",
  },
  {
    id: 7,
    category: " Hair Treatment",
    title: "Mielle Rosemary Mint Strengthening Conditioner",
    price: 155000,
    image: image7,
    brand: "RedOne",
    Weight: "0.45kg",
    sellerId: "3",
  },
  {
    id: 8,
    category: "Conditioner, Hair Treatment",
    title: "Mielle Pomegranate & Honey Leave-In Conditioner",
    price: 150000,
    image: image8,
    brand: "RedOne",
    Weight: "0.45kg",
    sellerId: "1",
  },
];
