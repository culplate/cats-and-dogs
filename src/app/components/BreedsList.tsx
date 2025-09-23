"use client";

import { useState } from "react";
import { BreedCardType } from "../lib/types";
import Grid from "./Grid";
import Button from "./ui/Button";

const INITIAL_LIMIT = 20;

interface BreedsListProps {
  initialBreeds: BreedCardType[];
}

export default function BreedsList({ initialBreeds }: BreedsListProps) {
  const [breeds, setBreeds] = useState<BreedCardType[]>(initialBreeds);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchMoreBreeds = async (page: number) => {
    try {
      setLoadingMore(true);
      setError(null);

      const response = await fetch(
        `/api/breeds?limit=${INITIAL_LIMIT}&page=${page}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch breeds");
      }

      const newBreeds: BreedCardType[] = await response.json();

      setBreeds((prev) => [...prev, ...newBreeds]);

      // If we get fewer breeds than requested, we've reached the end
      setHasMore(newBreeds.length === INITIAL_LIMIT);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchMoreBreeds(nextPage);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Cats and Dogs</h1>

      <Grid breeds={breeds} />

      {error && breeds.length > 0 && (
        <div className="text-center py-4">
          <p className="text-red-600 mb-2">{error}</p>
        </div>
      )}

      {hasMore && (
        <div className="text-center py-8">
          <Button
            onClick={loadMore}
            loading={loadingMore}
            variant="primary"
            size="lg"
          >
            {loadingMore ? "Loading more..." : "Load More Breeds"}
          </Button>
        </div>
      )}

      {!hasMore && breeds.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">You've reached the end!</p>
        </div>
      )}
    </div>
  );
}
