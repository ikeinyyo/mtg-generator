import { CardGenerator } from "@/features/cardGenerator/CardGenerator";
import { CardList } from "@/features/cardList/cardList";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-4">
      <CardGenerator />
      <CardList />
    </main>
  );
}
