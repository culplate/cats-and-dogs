import { getBreeds } from "@/app/lib/api/breeds";
import { mergeCards, toCards } from "@/app/lib/merge";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get("limit")) || 20;
  const page = Number(searchParams.get("page")) || 0;

  try {
    const firstHalf = Math.ceil(limit / 2);
    const secondHalf = limit - firstHalf;

    const [catsRaw, dogsRaw] = await Promise.all([
      getBreeds("cat", firstHalf, page),
      getBreeds("dog", secondHalf, page),
    ]);

    const cats = toCards(catsRaw);
    const dogs = toCards(dogsRaw);

    const merged = mergeCards(cats, dogs);

    return NextResponse.json(merged);
  } catch (error) {
    console.error("Breeds API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch breeds" },
      { status: 500 }
    );
  }
}
