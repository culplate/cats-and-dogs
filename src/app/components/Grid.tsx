import { BreedCardType } from "../lib/types";
import BreedCard from "./BreedCard";
import SkeletonCard from "./ui/SkeletonCard";

interface GridProps {
  breeds: BreedCardType[];
}

export default function Grid({ breeds }: GridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {breeds.length === 0 ? (
        <>
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </>
      ) : (
        breeds.map((b) => <BreedCard key={`${b.species}-${b.id}`} breed={b} />)
      )}
    </div>
  );
}
