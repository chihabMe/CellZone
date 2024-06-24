import Image from "next/image";
import Link from "next/link";
import React from "react";

const services = [
  {
    text: "Bonus program",
    href: "/services/bonus-program",
  },
  {
    text: "Gift cards",
    href: "/services/gift-cards",
  },

  {
    text: "Credit and payment",
    href: "/services/credit-and-payment",
  },

  {
    text: "Service contracts",
    href: "/services/service-contracts",
  },

  {
    text: "Non-cash account",
    href: "/services/non-cash-account",
  },
  {
    text: "Payment",
    href: "/services/payment",
  },
];
const socialMedia = [
  {
    name: "facebook",
    link: "#",
    image: "/images/facebook.png",
  },

  {
    name: "twitter",
    link: "#",
    image: "/images/twitter.png",
  },

  {
    name: "instagram",
    link: "#",
    image: "/images/instagram.png",
  },

  {
    name: "tiktok",
    link: "#",
    image: "/images/tiktok.png",
  },
];
const resources = [
  {
    text: "Find an order",
    href: "/services/find-an-order",
  },
  {
    text: "Terms of delivery",
    href: "/services/terms-of-delivery",
  },
  {
    text: "Exchange and return of goods",
    href: "/services/exchange-and-return-of-goods",
  },
  {
    text: "Guarantee",
    href: "/services/guarantee",
  },
  {
    text: "Frequently asked questions",
    href: "/services/frequently-asked-questions",
  },
  {
    text: "Terms of use of the site",
    href: "/services/terms-of-use-of-the-site",
  },
];

const Footer = () => {
  return (
    <footer className="bg-black py-32 px-4">
      <div className="container  mx-auto  gap-6 grid grid-cols-1  lg:grid-cols-4">
        <div className="space-y-4 flex flex-col justify-between  grid-cols-subgrid  lg:col-span-2">
          <div className="flex flex-col   ">
            <div>
              <h1 className="text-white pb-4  text-3xl">Cyber</h1>
              <p className="py-4 text-gray-300 max-w-[500px]">
                We are a residential interior design firm located in Portland.
                Our boutique-studio offers more than
              </p>
            </div>
          </div>
          <ul className="flex space-x-8">
            {socialMedia.map((s) => (
              <li className="cursor-pointer" key={`social_${s.link}_${s.name}`}>
                <a href={s.link} target="_blank">
                  <Image
                    alt={`${s.name} image `}
                    src={s.image}
                    width={16}
                    height={16}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ul className="flex flex-col   ">
            <li className="py-2">
              <h1 className="text-white text-lg font-medium">Services</h1>
            </li>
            {services.map((s) => (
              <li
                className=" py-2 text-[15px] hover:text-white text-gray-400 transition-all duration-300"
                key={`service_${s.href}`}
              >
                <Link href={s.href}>{s.text}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ul className="flex flex-col   ">
            <li className="py-2">
              <h1 className="text-white text-lg font-medium">
                Assistance to the buyer
              </h1>
            </li>
            {resources.map((s) => (
              <li
                className=" py-2 text-[15px] hover:text-white text-gray-400 transition-all duration-300"
                key={`resources_${s.href}`}
              >
                <Link href={s.href}>{s.text}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
