import Image from "next/image";
import Link from "next/link";
import { BreedCardType } from "../lib/types";

interface BreedCardProps {
  breed: BreedCardType;
}

export default function BreedCard({ breed }: BreedCardProps) {
  return (
    <Link
      href={`/breed/${breed.id}?species=${breed.species}`}
      className="block h-full"
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer h-full flex flex-col">
        {breed.imageUrl && (
          <Image
            src={breed.imageUrl}
            alt={breed.name}
            width={300}
            height={200}
            className="w-full h-48 object-cover flex-shrink-0"
          />
        )}
        <div className="p-4 flex-1 flex items-center justify-center">
          <h2 className="text-xl font-semibold text-center hover:text-blue-600 transition-colors duration-200 line-clamp-2">
            {breed.name}
          </h2>
        </div>
      </div>
    </Link>
  );
}
