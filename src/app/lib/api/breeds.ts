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
