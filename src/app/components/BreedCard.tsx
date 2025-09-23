import Image from "next/image";
import { BreedCardType } from "../lib/types";

interface BreedCardProps {
  breed: BreedCardType;
}

export default function BreedCard({ breed }: BreedCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
              breed.species === "cat"
                ? "bg-purple-100 text-purple-800"
                : "bg-orange-100 text-orange-800"
            }`}
          >
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
  );
}
