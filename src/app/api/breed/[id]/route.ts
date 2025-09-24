import { getBreedById } from "@/app/lib/api/breeds";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { searchParams } = new URL(req.url);
  const species = searchParams.get("species") as "cat" | "dog";
  const { id } = await params;

  if (!species || !["cat", "dog"].includes(species)) {
    return NextResponse.json(
      { error: "Species parameter is required and must be 'cat' or 'dog'" },
      { status: 400 }
    );
  }

  try {
    const breedData = await getBreedById(species, id);
    return NextResponse.json(breedData);
  } catch (error) {
    console.error("Breed API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch breed details" },
      { status: 500 }
    );
  }
}
