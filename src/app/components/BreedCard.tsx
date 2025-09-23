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
        <div className="text-sm text-gray-600 mb-2"></div>
      </div>
    </div>
  );
}
