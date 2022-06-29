import React from "react";
import { Disclosure, RadioGroup, Tab } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/solid";
import { HeartIcon, MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";

const product = {
  name: "Zip Tote Basket",
  price: "$140",
  rating: 4,
  images: [
    {
      id: 1,
      name: "Angled view",
      src: "https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg",
      alt: "Angled front view with bag zipped and handles upright.",
    },
    {
      id: 1,
      name: "Angled view",
      src: "https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg",
      alt: "Angled front view with bag zipped and handles upright.",
    },
    // More images...
  ],
  colors: [
    {
      name: "Washed Black",
      bgColor: "bg-gray-700",
      selectedColor: "ring-gray-700",
    },
    { name: "White", bgColor: "bg-white", selectedColor: "ring-gray-400" },
    {
      name: "Washed Gray",
      bgColor: "bg-gray-500",
      selectedColor: "ring-gray-500",
    },
  ],
  description: `
    <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
  `,
  details: [
    {
      name: "Features",
      items: [
        "Multiple strap configurations",
        "Spacious interior with top zip",
        "Leather handle and tabs",
        "Interior dividers",
        "Stainless strap loops",
        "Double stitched construction",
        "Water-resistant",
      ],
    },
    // More sections...
  ],
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface ParentCompProps {
  childComp?: React.ReactNode;
}

export const Product: React.FC<ParentCompProps> = (props) => {
  return (
    <>
      <Tab.Group as="div" className="flex flex-col-reverse">
        {/* Image selector */}
        <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
          <Tab.List className="grid grid-cols-4 gap-6">
            {product.images.map((image) => (
              <Tab
                key={image.id}
                className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
              >
                {({ selected }) => (
                  <>
                    <span className="sr-only">{image.name}</span>
                    <span className="absolute inset-0 rounded-md overflow-hidden">
                      <img
                        src={image.src}
                        alt=""
                        className="w-full h-full object-center object-cover"
                      />
                    </span>
                    <span
                      className={classNames(
                        selected ? "ring-indigo-500" : "ring-transparent",
                        "absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none"
                      )}
                      aria-hidden="true"
                    />
                  </>
                )}
              </Tab>
            ))}
          </Tab.List>
        </div>

        <Tab.Panels className="w-full aspect-w-1 aspect-h-1">
          {product.images.map((image) => (
            <Tab.Panel key={image.id}>
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-center object-cover sm:rounded-lg"
              />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>

      {/* Product info */}
      <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          {product.name}
        </h1>
        <div className="mt-3">
          <h2 className="sr-only">Product information</h2>
          <p className="text-3xl text-gray-900">{product.price}</p>
        </div>
        <div className="mt-6">
          <h3 className="sr-only">Description</h3>

          <div
            className="text-base text-gray-700 space-y-6 mb-12"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
        {props.childComp}
      </div>
    </>
  );
};
