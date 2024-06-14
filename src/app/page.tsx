import { CardGenerator } from "@/features/cardGenerator/CardGenerator";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-4">
      <CardGenerator />
    </main>
  );
}
