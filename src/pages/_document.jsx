import { Head, Html, Main, NextScript } from "next/document";
import clsx from "clsx";

export default function Document(props) {
  return (
    <Html
      className="h-full scroll-smooth min-w-full bg-white antialiased[font-feature-settings:'ss01']"
      lang="en"
    >
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Lexend:wght@400;500&display=swap"
        />
      </Head>
      <body className=" h-full ">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
