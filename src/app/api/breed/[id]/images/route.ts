import { getBreedImages } from "@/app/lib/api/breeds";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { searchParams } = new URL(req.url);
  const species = searchParams.get("species") as "cat" | "dog";
  const limit = Number(searchParams.get("limit")) || 10;
  const { id } = await params;

  if (!species || !["cat", "dog"].includes(species)) {
    return NextResponse.json(
      { error: "Species parameter is required and must be 'cat' or 'dog'" },
      { status: 400 }
    );
  }

  try {
    const images = await getBreedImages(species, id, limit);
    return NextResponse.json(images);
  } catch (error) {
    console.error("Breed images API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch breed images" },
      { status: 500 }
    );
  }
}
