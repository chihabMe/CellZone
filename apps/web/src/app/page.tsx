import { Metadata } from "next";
import Hero from "./components/Hero";
import Introduction from "./components/Introduction";
import Categories from "./components/Categories";
import Products from "./components/Products";
import Popular from "./components/Popular";

export const metadata: Metadata = {
  title: "CellShope",
  description: "CellShope is a platform for buying and selling mobile phones",
};
export default function Home() {
  return (
    <main>
      <Hero />
      <Introduction />
      <Categories />
      <Products />
      <Popular/>
    </main>
  );
}
