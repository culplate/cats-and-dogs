import Image from "next/image";
import { BreedCardType } from "./lib/types";

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {breeds.map((breed: BreedCardType) => (
          <div
            key={breed.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {breed.imageUrl && (
              <Image
                src={breed.imageUrl}
                alt={breed.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{breed.name}</h2>
              <div className="text-sm text-gray-600 mb-2">
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  {breed.species}
                </span>
              </div>
              {breed.origin && (
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-medium">Origin:</span> {breed.origin}
                </p>
              )}
              {breed.temperament && (
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Temperament:</span>{" "}
                  {breed.temperament}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
