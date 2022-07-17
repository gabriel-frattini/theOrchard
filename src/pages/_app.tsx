import "tailwindcss/tailwind.css";
import "../styles/global.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { AppType } from "next/dist/shared/lib/utils";
import superjson from "superjson";
import NextNProgress from "nextjs-progressbar";

const MyApp: AppType = ({ Component, pageProps }) => {
  const description =
    "We're here to answer the eternal question: What Pokémon is roundest?";
  const title = "Roundest Pokémon - Public Poll";
  const imageMetaURL = "https://roundest.t3.gg/spheal.png";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href={"/favicon.ico"} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageMetaURL} />
        <meta name="twitter:image" content={imageMetaURL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="theme-color" content="#000000" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png?v=2"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png?v=2"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png?v=2"
        />
        <link rel="manifest" href="/site.webmanifest?v=2" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
        <meta
          name="apple-mobile-web-app-title"
          content="Round - Video Calls Powered By T3 Tools"
        />
        <meta
          name="application-name"
          content="Round - Video Calls Powered By T3 Tools"
        />
      </Head>
      <NextNProgress
        color="#f43f5e"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
        options={{ showSpinner: false }}
      />
      <Component {...pageProps} />
    </>
  );
};

import { withTRPC } from "@trpc/next";
import type { AppRouter } from "@/backend/router";

function getBaseUrl() {
  if (process.browser) return ""; // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
    return {
      headers() {
        return {
          cookie: ctx?.req?.headers.cookie,
        };
      },
      url,

      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: ONE_DAY_IN_SECONDS,
          },
        },
      },
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
  responseMeta({ ctx, clientErrors }) {
    if (clientErrors.length) {
      // propagate http first error from API calls
      return {
        status: clientErrors[0].data?.httpStatus ?? 500,
      };
    }

    // cache request for 1 day + revalidate once every second
    const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
    return {
      headers: {
        "cache-control": `s-maxage=1, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
      },
    };
  },
})(MyApp);
