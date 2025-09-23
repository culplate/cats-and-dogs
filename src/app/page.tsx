import { BreedCardType } from "./lib/types";
import Grid from "./components/Grid";

async function getBreeds(): Promise<BreedCardType[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/breeds?limit=20&page=0`, {
    cache: "force-cache", // cache for better performance
    next: { revalidate: 86400 }, // expire every 24 hours
  });

  if (!response.ok) {
    throw new Error("Failed to fetch breeds at");
  }

  return response.json();
}

export default async function Home() {
  const breeds = await getBreeds();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Cats and Dogs</h1>
      <Grid breeds={breeds} />
    </div>
  );
}
