import { Fragment } from "react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";

import { Container } from "@/components/Container";

function MobileNavigation() {
  return (
    <Popover>
      {({ open, close }) => (
        <>
          <Popover.Button className="relative  mt-8 rounded-lg bg-white/50  hover:bg-white/60 z-10 flex h-10 w-10 items-center justify-center [&:not(:focus-visible)]:focus:outline-none">
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
                  <Link replace href="/admin">
                    <a className="block w-full" onClick={() => close()}>
                      Dashboard
                    </a>
                  </Link>
                </li>
                <li>
                  <Link replace href="/admin/rooms">
                    <a className="block w-full" onClick={() => close()}>
                      Rooms
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/" replace>
                    <a className="block w-full" onClick={() => close()}>
                      Home
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
    <Container className="mr-6 ml-6 mt-12 absolute right-0 ">
      <nav className="relative z-50 text-sm">
        <ul className="flex items-center justify-end">
          <li className="ml-12 py-3 pl-8 pr-5 rounded-l-lg hidden lg:block ">
            <Link href="/admin">
              <a className="text-xl font-medium text-black">Dashboard</a>
            </Link>
          </li>
          <li className="py-3 px-5 hidden lg:block ">
            <Link replace href="/admin/rooms">
              <a className="text-xl font-medium text-black">Rooms</a>
            </Link>
          </li>
          <li className="py-3 px-5 hidden lg:block ">
            <Link replace href="/">
              <a className="text-xl font-medium text-black">Home</a>
            </Link>
          </li>
        </ul>
        <div className="lg:hidden flex justify-end ">
          <MobileNavigation />
        </div>
      </nav>
    </Container>
  );
}
