import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

const Introduction = () => {
  return (
    <section className="bg-[#EDEDED]">
      <div className="container flex flex-col lg:flex-row   mx-auto ">
        
        <div className="w-full lg:w-1/2 ">
          <div className="flex  bg-white  justify-between items-center">
            <Image
              src={"/images/playstation.png"}
              alt="playstation"
              width={350}
              height={350}
            />
            <div className="max-w-[400px] flex flex-col space-y-4">
              <h2 className="text-black font-medium text-4xl">Playstation 5</h2>
              <p className="text-gray-500 font-medium">
                Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O
                will redefine your PlayStation experience.
              </p>
            </div>
          </div>

          <div className="flex   ">
            <div className="w-full md:w-1/2 bg-[#EDEDED] relative flex justify-center items-center ">
              <Image
                src={"/images/headphone.png"}
                alt="head phone"
                className="absolute left-0 hidden sm:block -translate-y-1/2 top-1/2 "
                width={80}
                height={80}
              />
              <div className="max-w-[200px] ml-10">
                <h2 className="text-gray-800 text-2xl">Apple</h2>
                <h2 className="text-gray-800 text-2xl">AirPods </h2>

                <h2 className="text-gray-800 text-2xl font-bold">Max</h2>
                <p className="text-gray-600">
                  Computational audio. Listen, its powerful
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative flex h-[250px] items-center justify-center  bg-[#353535]">
              <Image
                src={"/images/buds.png"}
                className="absolute hidden sm:block left-0 -translate-y-1/2 top-1/2 "
                alt="buds"
                width={100}
                height={100}
              />
              <div className="max-w-[180px] ml-8 flex flex-col space-y-1">
                <h2 className="text-gray-100 text-3xl">Apple</h2>
                <h2 className="text-gray-100 text-3xl">
                  Vision<span className="font-bold text-white"> Pro</span>{" "}
                </h2>
                <p className="text-gray-300">
                  An immersive way to experience entertainment
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-4 lg:w-1/2 flex items-center h-[400px] lg:h-auto lg:justify-center bg-[#EDEDED] relative">
          <div className="w-[400px] lg:max-w-[400px] lg:mr-20 space-y-1">
            <h1 className="font-thin text-6xl ">MACBOOK</h1>
            <h1 className="font-medium text-6xl">AIR</h1>
            <p className="text-gray-400 font-medium my-2" >
              The new 15‑inch MacBook Air makes room for more of what you love
              with a spacious Liquid Retina display.
            </p>
            <Link href="/products">
              <Button className="text-gray-900 hover:bg-gray-800 hover:text-white font-medium mt-4 ring-gray-700">
                Shop Now
              </Button>
            </Link>
          </div>
          <Image
            className="absolute hidden md:block right-0 top-1/2 -translate-y-1/2"
            src={"/images/macbook.png"}
            alt="iphone"
            width={250}
            height={250}
          />
        </div>
      </div>
    </section>
  );
};

export default Introduction;
