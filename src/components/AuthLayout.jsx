import Image from "next/image";

import backgroundImage from "@/images/background-auth.jpg";

export function AuthLayout({ children }) {
  return (
    <>
      <div className="relative flex min-h-[100vh] justify-center md:px-12 lg:px-0">
        <div className="relative z-10 flex flex-1 flex-col justify-center bg-white py-12 px-4 shadow-2xl md:flex-none md:px-28">
          <div className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
            {children}
          </div>
        </div>
        <div className="absolute inset-0 hidden w-full flex-1 sm:block lg:relative lg:w-0">
          <Image
            src={backgroundImage}
            alt=""
            layout="fill"
            objectFit="cover"
            unoptimized
          />
        </div>
      </div>
    </>
  );
}
