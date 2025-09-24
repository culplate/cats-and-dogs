import { Species } from "../types";

const DOG_API_URL = process.env.DOG_API_URL;
const CAT_API_URL = process.env.CAT_API_URL;

export const getBreeds = async (
  species: Species,
  limit: number = 10,
  page: number = 0
) => {
  const apiUrl = species === "dog" ? DOG_API_URL : CAT_API_URL;
  const apiKey =
    species === "dog" ? process.env.DOG_API_KEY : process.env.CAT_API_KEY;

  const response = await fetch(`${apiUrl}/breeds?limit=${limit}&page=${page}`, {
    headers: apiKey ? { "x-api-key": apiKey } : {},
    next: {
      revalidate: 86400,
    },
  });

  if (!response.ok) {
    throw new Error(`${species} API: Failed to fetch breeds`);
  }

  const data = await response.json();
  return data;
};

export const getBreedById = async (species: Species, breedId: string) => {
  const apiUrl = species === "dog" ? DOG_API_URL : CAT_API_URL;
  const apiKey =
    species === "dog" ? process.env.DOG_API_KEY : process.env.CAT_API_KEY;

  const response = await fetch(`${apiUrl}/breeds/${breedId}`, {
    headers: apiKey ? { "x-api-key": apiKey } : {},
    next: {
      revalidate: 86400,
    },
  });

  if (!response.ok) {
    throw new Error(`${species} API: Failed to fetch breed ${breedId}`);
  }

  const data = await response.json();
  return data;
};

export const getBreedImages = async (
  species: Species,
  breedId: string,
  limit: number = 10
) => {
  const apiUrl = species === "dog" ? DOG_API_URL : CAT_API_URL;
  const apiKey =
    species === "dog" ? process.env.DOG_API_KEY : process.env.CAT_API_KEY;

  const response = await fetch(
    `${apiUrl}/images/search?breed_ids=${breedId}&limit=${limit}`,
    {
      headers: apiKey ? { "x-api-key": apiKey } : {},
      next: {
        revalidate: 86400,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `${species} API: Failed to fetch images for breed ${breedId}`
    );
  }

  const data = await response.json();
  return data;
};
