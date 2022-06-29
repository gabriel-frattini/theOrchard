/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import React, { useState } from "react";

import { Hero } from "@/components/Hero";
import { Contact } from "@/components/Contact";
import { Product } from "@/components/Product";

const Room: React.FC = () => {

  return (
    <>
      <Hero />
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          <Product childComp={<Contact />} />
        </div>
      </div>
    </>
  );
};

export default Room;
