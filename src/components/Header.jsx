import { Fragment } from "react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";

import { ButtonLink } from "@/components/Button";
import { Container } from "@/components/Container";

function MobileNavigation() {
  return (
    <Popover>
      {({ open, close }) => (
        <>
          <Popover.Button className="relative rounded-lg bg-white/50  hover:bg-white/60 z-10 flex h-10 w-10 items-center justify-center [&:not(:focus-visible)]:focus:outline-none">
            <span className="sr-only">Toggle Navigation</span>
            <svg
              aria-hidden="true"
              className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
              fill="none"
              strokeWidth={2}
              strokeLinecap="round"
            >
              <path
                d="M0 1H14M0 7H14M0 13H14"
                className={clsx("origin-center transition", {
                  "scale-90 opacity-0": open,
                })}
              />
              <path
                d="M2 2L12 12M12 2L2 12"
                className={clsx("origin-center transition", {
                  "scale-90 opacity-0": !open,
                })}
              />
            </svg>
          </Popover.Button>
          <Transition.Root>
            <Transition.Child
              as={Fragment}
              enter="duration-150 ease-out"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="duration-150 ease-in"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Popover.Overlay className="fixed inset-0 bg-slate-300/50" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="duration-150 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                as="ul"
                className="absolute inset-x-0 top-full mt-4 origin-top space-y-4 rounded-2xl bg-white p-6 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5"
              >
                <li>
                  <Link href="rooms">
                    <a className="block w-full" onClick={() => close()}>
                      Rooms
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="#reviews">
                    <a className="block w-full" onClick={() => close()}>
                      Reviews
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="#contact">
                    <a className="block w-full" onClick={() => close()}>
                      Contact
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="#faq">
                    <a className="block w-full" onClick={() => close()}>
                      FAQ
                    </a>
                  </Link>
                </li>
              </Popover.Panel>
            </Transition.Child>
          </Transition.Root>
        </>
      )}
    </Popover>
  );
}

export function Header() {
  return (
    <header className="absolute top-8 w-full">
      <Container>
        <nav className="relative z-50 text-sm">
          <ul className="flex items-center">
            <li className="ml-12 py-3 pl-8 pr-5 rounded-l-lg hidden md:block bg-white/50  hover:bg-white/60">
              <Link href="#rooms">
                <a className="text-xl font-medium text-blue-800 hover:text-blue-700">
                  Rooms
                </a>
              </Link>
            </li>
            <li className="py-3 px-5 hidden md:block bg-white/50  hover:bg-white/60">
              <Link href="#reviews">
                <a className="text-xl font-medium text-blue-800 hover:text-blue-700">
                  Reviews
                </a>
              </Link>
            </li>
            <li className="py-3 px-5 hidden md:block bg-white/50  hover:bg-white/60">
              <Link href="#contact">
                <a className="text-xl font-medium text-blue-800 hover:text-blue-700">
                  Contact
                </a>
              </Link>
            </li>
            <li className="py-3 pr-8 pl-5 rounded-r-lg hidden md:block bg-white/50  hover:bg-white/60">
              <Link href="#faq">
                <a className="text-xl font-medium text-blue-800 hover:text-blue-700">
                  FAQ
                </a>
              </Link>
            </li>
            <li className="ml-5 -mr-1 md:hidden">
              <MobileNavigation />
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
