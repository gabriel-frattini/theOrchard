import Image from "next/image";

import { Container } from "@/components/Container";
import location from "@/images/logos/location.svg";
import header from "@/images/header.jpeg";
import Link from "next/link";

export function Hero() {
  return (
    <>
      <Container className="relative pt-20 pb-16 text-center lg:pt-32">
        <div className="absolute top-0 left-1/2 -z-10 h-full w-full -translate-x-1/2 rounded-xl brightness-50">
          <Image src={header} layout="fill" objectFit="cover" />
        </div>
        <h1 className="mx-auto mt-28 font-display text-xl sm:text-4xl font-display tracking-tight text-slate-900 ">
          <Link href="/" replace>
            <div className="cursor-pointer hover:brightness-150">
              <span className="relative whitespace-nowrap text-white">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 418 42"
                  className="absolute top-2/3 left-1/2 -translate-x-1/2 w-full h-[0.58em] fill-rose-500/70"
                  preserveAspectRatio="none"
                >
                  <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
                </svg>

                <span className="relative font-display sm:text-5xl text-4xl">
                  The Orchard Holiday Home
                </span>
              </span>{" "}
            </div>
          </Link>
        </h1>
        <p className="mx-auto mt-12 max-w-2xl text-xl sm:text-2xl tracking-tight text-white font-display">
          We want you to love where you live and to feel at home.
        </p>

        <div className="mt-36 lg:mt-48 flex align-center justify-center cursor-pointer">
          <Link href="https://www.google.com/maps/place/The+Orchard+Holiday+Home/@-4.6903364,55.4615672,17z/data=!3m1!4b1!4m8!3m7!1s0x22e02a58aabe6c17:0xc0b784e92bc66a40!5m2!4m1!1i2!8m2!3d-4.6902369!4d55.4636991">
            <p className="font-display text-lg text-white">
              Barbarons, Grand Anse, Seychellerna{" "}
            </p>
          </Link>
          <Image src={location} alt="Transistor" layout="fixed" unoptimized />
        </div>
      </Container>
    </>
  );
}
