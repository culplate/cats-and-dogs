import { BreedCardType } from "./types";

export async function getInitialBreeds(): Promise<BreedCardType[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    const response = await fetch(`${baseUrl}/api/breeds?limit=20&page=0`, {
      cache: "force-cache",
      next: { revalidate: 86400 }, // expire every 24 hours
    });

    if (!response.ok) {
      throw new Error("Failed to fetch initial breeds");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching initial breeds:", error);
    throw new Error("Failed to load breeds");
  }
}

