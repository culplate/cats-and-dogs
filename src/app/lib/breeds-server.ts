import { BreedCardType } from "./types";
import { getBreeds } from "./api/breeds";
import { mergeCards, toCards } from "./merge";

export async function getInitialBreeds(): Promise<BreedCardType[]> {
  try {
    // Call the API functions directly instead of making HTTP requests to prevent CORS and build issues
    const limit = 20;
    const page = 0;
    const firstHalf = Math.ceil(limit / 2);
    const secondHalf = limit - firstHalf;

    const [catsRaw, dogsRaw] = await Promise.all([
      getBreeds("cat", firstHalf, page),
      getBreeds("dog", secondHalf, page),
    ]);

    const cats = toCards(catsRaw, "cat");
    const dogs = toCards(dogsRaw, "dog");

    return mergeCards(cats, dogs);
  } catch (error) {
    console.error("Error fetching initial breeds:", error);
    return [];
  }
}
