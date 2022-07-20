import React from "react";
import Head from "next/head";
import { CallToAction } from "@/components/CallToAction";
import { Faqs } from "@/components/Faqs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Testimonials } from "@/components/Testimonials";
import { Rooms } from "@/components/room";

interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <body className="min-w-[600px]">
      <Head>
        <title>The Orchard Holiday Home</title>
        <meta
          name="description"
          content="We want you to love where you live and to feel at home."
        />
      </Head>
      <main>
        <Hero />
        <Rooms />
        <Testimonials />
      </main>
      <Footer />
    </body>
  );
};

export default Home;
