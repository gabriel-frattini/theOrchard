import { useEffect, useState } from "react";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";

import { Container } from "@/components/Container";
import backgroundImage from "@/images/background-features.jpg";
import deluxeroom from "@/images/deluxeroom.jpg";
import twinroom from "@/images/twinroom.jpg";
import kingroom from "@/images/kingroom.jpg";
import queenroom from "@/images/queenroom.jpg";

const features = [
  {
    title: "King Room",
    description:
      "Airconditioned doubleroom with own bathroom and a view over the garden",
    image: kingroom,
  },
  {
    title: "Queen Room",
    description:
      "Airconditioned doubleroom with own bathroom and a view over the garden",
    image: queenroom,
  },
  {
    title: "Doubleroom Deluxe",
    description:
      "Airconditioned doubleroom with own bathroom and a view over the garden",
    image: deluxeroom,
  },
  {
    title: "Doubleroom",
    description:
      "Airconditioned doubleroom with own bathroom and a view over the garden",
    image: twinroom,
  },
];

export function PrimaryFeatures() {
  let [tabOrientation, setTabOrientation] = useState("horizontal");

  useEffect(() => {
    let lgMediaQuery = window.matchMedia("(min-width: 1024px)");

    function onMediaQueryChange({ matches }) {
      setTabOrientation(matches ? "vertical" : "horizontal");
    }

    onMediaQueryChange(lgMediaQuery);
    lgMediaQuery.addEventListener("change", onMediaQueryChange);

    return () => {
      lgMediaQuery.removeEventListener("change", onMediaQueryChange);
    };
  }, []);

  return (
    <section
      id="rooms"
      aria-labelledby="features-title"
      className="relative z-0 overflow-hidden bg-gray-50 pt-20 pb-28 sm:py-32"
    >
      <Container className="relative">
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
          <h2
            id="features-title"
            className="font-display text-3xl tracking-tight text-black sm:text-4xl md:text-5xl"
          >
            Our rooms.
          </h2>
          <p className="mt-6 text-lg tracking-tight text-black">
            Relax and enjoy the beautiful atmosphere around you. We are playing
            a part in supporting safe travel and we want our guests to be able
            to stay with confidence.
          </p>
        </div>
        <Tab.Group
          as="div"
          className="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0"
          vertical={tabOrientation === "vertical"}
        >
          {({ selectedIndex }) => (
            <>
              <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
                <Tab.List className="relative z-10 flex space-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:space-y-1 lg:space-x-0 lg:whitespace-normal">
                  {features.map((feature, featureIndex) => (
                    <div
                      key={feature.title}
                      className={clsx(
                        "group relative rounded-full py-1 px-4 lg:rounded-r-none lg:rounded-l-xl lg:p-6",
                        {
                          "bg-white lg:bg-white lg:ring-1 lg:ring-inset lg:ring-white/100 shadow-xl shadow-slate-900/10":
                            selectedIndex === featureIndex,
                          "hover:bg-white/10 lg:hover:bg-white/5":
                            selectedIndex !== featureIndex,
                        }
                      )}
                    >
                      <h3>
                        <Tab
                          className={clsx(
                            "font-display text-lg [&:not(:focus-visible)]:focus:outline-none",
                            {
                              "text-black lg:text-black":
                                selectedIndex === featureIndex,
                              "text-gray-700 hover:text-black lg:text-gray-700":
                                selectedIndex !== featureIndex,
                            }
                          )}
                        >
                          <span className="absolute inset-0  rounded-full lg:rounded-r-none lg:rounded-l-xl" />
                          {feature.title}
                        </Tab>
                      </h3>
                      <p
                        className={clsx("mt-2 hidden text-sm lg:block", {
                          "text-black": selectedIndex === featureIndex,
                          "text-black group-hover:text-black":
                            selectedIndex !== featureIndex,
                        })}
                      >
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </Tab.List>
              </div>
              <Tab.Panels className="lg:col-span-7">
                {features.map((feature, idx) => (
                  <Tab.Panel key={feature.title} unmount={false}>
                    <div className="relative sm:px-6 lg:hidden">
                      <div className="absolute -inset-x-4 -top-[6.5rem] -bottom-[4.25rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl" />
                      <p className="relative mx-auto max-w-2xl text-base text-white sm:text-center">
                        {feature.description}
                      </p>
                    </div>
                      <Link href={`rooms/${idx}`}>
                        <p className="flex  font-medium text-lg max-w-fit hover:border-black border-b-gray-50 cursor-pointer border-b-2">
                          View Room
                        </p>
                      </Link>
                      <Link href={`rooms/${idx}`}>
                        <div className="relative mt-10 aspect-[1085/730] w-[45rem] overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:max-w-[57.8125rem]  hover:cursor-pointer">
                          <Image
                            src={feature.image}
                            alt=""
                            layout="fill"
                            objectFit="contain"
                            priority
                          />
                        </div>
                      </Link>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </>
          )}
        </Tab.Group>
      </Container>
    </section>
  );
}
