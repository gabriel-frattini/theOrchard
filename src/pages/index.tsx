import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Testimonials } from "@/components/Testimonials";
import { RoomsList } from "../components/RoomsList";

import Head from "next/head";
import { createSSGHelpers } from "@trpc/react/ssg";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";

import { appRouter } from "@/backend/router";
import { createContext } from "@/backend/router/context";
import { trpc } from "@/utils/trpc";

import type { roomProps } from "@/utils/types";

interface Props {}

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>
) {
  const ctx = await createContext();
  const ssg = await createSSGHelpers({
    router: appRouter,
    ctx,
  });

  await ssg.fetchQuery("room.get-rooms");
  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  };
}

const Home = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data, isLoading } = trpc.useQuery(["room.get-rooms"]);

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
        {!isLoading && <RoomsList data={data as roomProps[]} />}
        <Testimonials />
      </main>
      <Footer />
    </body>
  );
};

export default Home;
