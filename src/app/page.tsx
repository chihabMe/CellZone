import { Metadata } from "next";
import Hero from "./components/Hero";

export const metadata: Metadata = {
  title: "CellShope",
  description: "CellShope is a platform for buying and selling mobile phones",
};
export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
