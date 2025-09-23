export type Species = "cat" | "dog";

export type BreedCardType = {
  id: string;
  name: string;
  species: Species;
  imageUrl?: string;
  origin?: string;
  temperament?: string;
};
