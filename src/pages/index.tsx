import React from "react";
import Head from "next/head";
import { CallToAction } from "@/components/CallToAction";
import { Faqs } from "@/components/Faqs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Rooms } from "@/components/room";

interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <>
      <Head>
        <title>TaxPal - Accounting made simple for small businesses</title>
        <meta
          name="description"
          content="Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don’t get audited."
        />
      </Head>
      <Header />
      <main>
        <Hero />
        <Rooms />
        <Testimonials />
        <Faqs />
      </main>
      <Footer />
    </>
  );
};

export default Home;
