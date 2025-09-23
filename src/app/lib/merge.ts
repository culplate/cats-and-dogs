import { BreedCardType } from "./types";

// interleave two arrays
export const interleave = <T>(a: T[], b: T[]): T[] => {
  const out: T[] = [];
  let i = 0,
    j = 0;
  while (i < a.length || j < b.length) {
    if (i < a.length) out.push(a[i++]);
    if (j < b.length) out.push(b[j++]);
  }
  return out;
};

// convert items to BreedCard[]
export const toCards = (
  items: any[],
  species: "cat" | "dog"
): BreedCardType[] => {
  return items.map((b) => ({
    id: String(b.id),
    name: b.name,
    species,
    origin: b.origin,
    temperament: b.temperament,
    imageUrl: b.image?.url ?? "",
  }));
};

// merge two arrays
export const mergeCards = (
  cats: BreedCardType[],
  dogs: BreedCardType[]
): BreedCardType[] => {
  return interleave(cats, dogs);
};
