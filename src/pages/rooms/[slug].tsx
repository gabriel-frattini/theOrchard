import React from "react";

import { Hero } from "@/components/Hero";
import { Contact } from "@/components/Contact";
import { Room } from "@/components/Room";

const RoomSlug: React.FC = () => {
  return (
    <div className="min-w-[600px]">
      <Hero />
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-[90rem] lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">
          <Room children={<Contact />} />
        </div>
      </div>
    </div>
  );
};

export default RoomSlug;
