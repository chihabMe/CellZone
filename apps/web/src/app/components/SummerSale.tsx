import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import FooterBanner from "/public/images/footer-banner.png";

const SummerSale = () => {
  return (
    <section className="container w-full flex justify-center items-center h-[500px] relative mx-auto">
      <Image
        placeholder="blur"
        alt="summer sale image"
        layout="fill"
        src={FooterBanner}
      />
      <div className="z-10 flex flex-col items-center space-y-4">
        <h1 className="text-7xl text-white  ">
          <span className="font-thin"> Big Summer</span>
          <span className="font-medium"> Sale</span>
        </h1>
        <p className="text-gray-400">
          Commodo fames vitae vitae leo mauris in. Eu consequat.
        </p>
        <Link href="/products">
          <Button>Shope Now</Button>
        </Link>
      </div>
    </section>
  );
};

export default SummerSale;
