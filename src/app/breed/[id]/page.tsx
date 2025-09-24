import { notFound } from "next/navigation";
import { Species } from "../../lib/types";
import ImageSlider from "../../components/ImageSlider";
import BackButton from "@/app/components/ui/BackButton";

interface BreedPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ species?: string }>;
}

async function getBreedDetails(id: string, species: Species) {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/breed/${id}?species=${species}`,
      {
        cache: "force-cache",
        next: { revalidate: 86400 }, // Cache for 24 hours
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error("Failed to fetch breed details");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching breed details:", error);
    return null;
  }
}

async function getBreedImages(id: string, species: Species) {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/breed/${id}/images?species=${species}&limit=10`,
      {
        cache: "force-cache",
        next: { revalidate: 86400 }, // Cache for 24 hours
      }
    );

    if (!response.ok) {
      return [];
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching breed images:", error);
    return [];
  }
}

export default async function BreedPage({
  params,
  searchParams,
}: BreedPageProps) {
  const { species } = (await searchParams) as { species: Species };
  const { id } = await params;

  if (!species || !["cat", "dog"].includes(species)) {
    notFound();
  }

  // Fetch both breed details and images in parallel
  const [breed, images] = await Promise.all([
    getBreedDetails(id, species),
    getBreedImages(id, species),
  ]);

  if (!breed) {
    notFound();
  }
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <BackButton />

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative">
          <ImageSlider images={images} />
        </div>

        {/* Breed Details */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {breed.name}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {breed.origin && (
                <div>
                  <h3 className="font-semibold text-gray-700">Origin</h3>
                  <p className="text-gray-600">{breed.origin}</p>
                </div>
              )}

              {breed.temperament && (
                <div>
                  <h3 className="font-semibold text-gray-700">Temperament</h3>
                  <p className="text-gray-600">{breed.temperament}</p>
                </div>
              )}

              {breed.description && (
                <div>
                  <h3 className="font-semibold text-gray-700">Description</h3>
                  <p className="text-gray-600">{breed.description}</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {breed.weight && (
                <div>
                  <h3 className="font-semibold text-gray-700">Weight</h3>
                  <p className="text-gray-600">
                    {typeof breed.weight === "string"
                      ? breed.weight
                      : breed.weight.imperial
                      ? breed.weight.imperial
                      : breed.weight.metric
                      ? breed.weight.metric
                      : "N/A"}
                  </p>
                </div>
              )}

              {breed.height && (
                <div>
                  <h3 className="font-semibold text-gray-700">Height</h3>
                  <p className="text-gray-600">
                    {typeof breed.height === "string"
                      ? breed.height
                      : breed.height.imperial
                      ? breed.height.imperial
                      : breed.height.metric
                      ? breed.height.metric
                      : "N/A"}
                  </p>
                </div>
              )}

              {breed.life_span && (
                <div>
                  <h3 className="font-semibold text-gray-700">Life Span</h3>
                  <p className="text-gray-600">{breed.life_span}</p>
                </div>
              )}

              {breed.breed_group && (
                <div>
                  <h3 className="font-semibold text-gray-700">Breed Group</h3>
                  <p className="text-gray-600">{breed.breed_group}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
