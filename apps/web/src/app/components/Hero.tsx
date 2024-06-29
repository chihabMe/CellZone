import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

const Hero = () => {
  return (
    <section className="bg-[#211C24] h-[700px]">
      <div className="container h-full px-4 relative mx-auto items-center max-w-screen-xl  flex justify-between">
          <div className="flex flex-col space-y-2">
            <h3 className="text-gray-500 text-2xl font-bold ">Pro.Beyond.</h3>
            <h1 className="text-white text-4xl md:text-8xl flex space-x-4">
              <span className="font-thin">IPhone 14</span>
              <span className="font-bold">Pro</span>
            </h1>
            <p className="text-gray-500 font-bold md:text-lg">
              Created to change everything for the better. For everyone
            </p>
            <Link href="/search ">
              <Button className="text-base md:text-lg">Shope Now</Button>
            </Link>
          </div>
        <div>
            <Image
              src="/images/iphone.png"
              alt="hero iphone image "
              className="absolute bottom-0 right-10 hidden md:block"
              width={400}
              height={400}
            />
        </div>
      </div>
    </section>
  );
};

export default Hero;
