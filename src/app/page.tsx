import BreedsList from "./components/BreedsList";
import { getInitialBreeds } from "./lib/breeds-server";

export default async function Home() {
  const initialBreeds = await getInitialBreeds();

  return <BreedsList initialBreeds={initialBreeds} />;
}
