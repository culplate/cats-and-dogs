import BreedsList from "./components/BreedsList";
import { getInitialBreeds } from "./lib/breeds-server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cat & Dog Breeds Directory | Find Your Perfect Pet Companion",
  description:
    "Browse our extensive collection of cat and dog breeds. Discover breed characteristics, temperament, origin, and find the perfect pet for your lifestyle. Complete guide to choosing your next furry friend.",
  keywords: [
    "cat breeds directory",
    "dog breeds directory",
    "pet breeds guide",
    "cat breed characteristics",
    "dog breed temperament",
    "pet selection guide",
    "feline breeds",
    "canine breeds",
    "pet adoption guide",
  ],
  openGraph: {
    title: "Cat & Dog Breeds Directory | Find Your Perfect Pet Companion",
    description:
      "Browse our extensive collection of cat and dog breeds. Discover breed characteristics, temperament, origin, and find the perfect pet for your lifestyle.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cat & Dog Breeds Directory | Find Your Perfect Pet Companion",
    description:
      "Browse our extensive collection of cat and dog breeds. Discover breed characteristics, temperament, origin, and find the perfect pet for your lifestyle.",
  },
};

export default async function Home() {
  const initialBreeds = await getInitialBreeds();

  return <BreedsList initialBreeds={initialBreeds} />;
}
