import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Category } from "@prisma/client";
// const categories = [
//   {
//     name: "phones",
//     image: "/images/phone-icon.png",
//     href: "products?category=phones",
//   },
//   {
//     name: "smart watches",
//     image: "/images/watch-icon.png",
//     href: "products?category=watch",
//   },
//   {
//     name: "headphones",
//     image: "/images/headphone-icon.png",
//     href: "products?category=headphones",
//   },

//   {
//     name: "cameras",
//     image: "/images/camera-icon.png",
//     href: "products?category=cameras",
//   },
//   {
//     name: "computers",
//     image: "/images/computer-icon.png",
//     href: "products?category=computers",
//   },
//   {
//     name: "gaming",
//     image: "/images/gaming-icon.png",
//     href: "products?category=gaming",
//   },
// ];
const getCategories = async (): Promise<Category[]> => {
  const response = await fetch("http://localhost:3000/api/categories", {
    method: "GET",
    cache: "force-cache",
  });
  if (!response.ok) throw new Error("failed to fetch categories");
  return response.json();
};
const Categories = async () => {
  const categories = await getCategories();
  return (
    <section className="py-10">
      <div className="container max-w-screen-xl mx-auto">
        <div className="flex justify-between">
          <h1 className="font-medium text-2xl">Browse By Category</h1>
          <div className="flex items-center gap-4">
            <div className="cursor-pointer">
              <ChevronLeftIcon className="h-7 w-7 text-gray-700" />
            </div>

            <div className="cursor-pointer">
              <ChevronRightIcon className="h-7 w-7 text-gray-500" />
            </div>
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6 space-x-4 py-10 items-center">
          {categories.map((category) => (
            <CategoryItem
              key={category.name}
              href={category.name}
              name={category.name}
              image={category.image}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};
const CategoryItem = (props: { name: string; image: string; href: string }) => {
  return (
    <li className="cursor-pointer bg-gray-200 rounded-xl p-6">
      <Link href={props.href}>
        <div className="flex flex-col space-y-3 justify-center items-center">
          <Image src={props.image} alt={props.name} width={50} height={50} />
          <span className="font-medium capitalize">{props.name}</span>
        </div>
      </Link>
    </li>
  );
};

export default Categories;
