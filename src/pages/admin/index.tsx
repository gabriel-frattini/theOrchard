import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { MenuAlt2Icon, XIcon } from "@heroicons/react/outline";

import { trpc, useUtils } from "@/utils/trpc";
import Link from "next/link";
import { setCorrectPhrase } from "@/utils/functions";
import { useRouter } from "next/router";
import { Header } from "@/components/Header";
import { router } from "@trpc/server";

interface messageProps {
  id: number;
  name: string;
  email: string;
  startDate: string;
  endDate: string;
  room: string;
  message: string;
  createdAt: Date;
}

interface childCompsProps {
  data: messageProps[] | any;
  setSidebarOpen?: any;
  sidebarOpen?: any;
  setActiveMsg?: any;
  activeMsg?: any;
  setParamId?: any;
  activeId?: number;
  setActiveId?: any;
}

const MobileSidebar = ({
  data,
  setSidebarOpen,
  sidebarOpen,
  activeId,
  setActiveId,
}: childCompsProps) => {
  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 flex z-40">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="  px-4">
                  <nav
                    className="h-full overflow-y-auto"
                    aria-label="Directory"
                  >
                    <ul
                      role="list"
                      className="relative z-0 divide-y divide-gray-200"
                    >
                      {data.map((person: messageProps, idx: number) => (
                        <li
                          key={idx}
                          className={
                            activeId === person.id ? "bg-gray-50" : "bg-white"
                          }
                          onClick={() => setActiveId(person.id)}
                        >
                          <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                            <div className="flex-1 min-w-0">
                              <span
                                className="absolute inset-0"
                                aria-hidden="true"
                              />
                              <p className="text-lg font-medium text-gray-900">
                                {person.name}
                              </p>
                              <p className="text-lg text-gray-500 truncate">
                                {person.message.length > 60
                                  ? `${person.message.slice(0, 60)}...`
                                  : person.message}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto"></div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

const DesktopSidebar = ({
  data,
  activeId,
  setActiveId,
  setParamId,
}: childCompsProps) => {
  return (
    <div className="hidden lg:flex lg:w-96 lg:flex-col lg:fixed lg:inset-y-0">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex flex-col flex-grow pt-5 bg-white overflow-y-auto">
        <nav
          className="h-full overflow-y-auto border-r-2"
          aria-label="Directory"
        >
          <ul role="list" className="relative z-0 divide-y divide-gray-200">
            {data?.map((person: messageProps, idx: number) => (
              <li
                key={idx}
                className={
                  activeId === person.id
                    ? "bg-gray-50 hover:cursor-pointer"
                    : "bg-white  hover:cursor-pointer"
                }
                onClick={() => {
                  setActiveId(person.id);
                  const url = new URL(window.location.href);
                  url.search = JSON.stringify(person.id);
                  window.history.replaceState({}, "", url.toString());
                  setParamId(JSON.stringify(person.id));
                }}
              >
                <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                  <div className="flex-1 min-w-0">
                    <span className="absolute inset-0" aria-hidden="true" />

                    <span className="flex justify-between">
                      <p className="text-lg font-medium text-gray-900">
                        {person.name}
                      </p>

                      <p className="text-gray-700 text-lg">
                        {person.createdAt.toString().split("T")[0]}
                      </p>
                    </span>
                    <p className="text-lg text-gray-500">
                      {person.message.length > 60
                        ? `${person.message.slice(0, 60)}...`
                        : person.message}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-5 flex-1 flex flex-col"></div>
      </div>
    </div>
  );
};

const SingleBooking: React.FC<{ deleteMsg: any; paramId: string }> = (
  props
) => {
  const router = useRouter();
  console.log("paramid", props.paramId);
  const { data, isLoading } = trpc.useQuery([
    "admin.get-message-by-id",
    {
      id: parseInt(props.paramId),
    },
  ]);
  if (isLoading) return <></>;

  if (!data) return <div>no data</div>;

  return (
    <div className="py-6 ">
      <div className="max-w-7xl flex justify-between mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-medium text-gray-900">{data.name}</h2>
        <XIcon
          width={24}
          height={24}
          className="cursor-pointer"
          onClick={() => props.deleteMsg(data.id)}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {
          <div className="flex space-x-3">
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium  mt-4 ">{data.email}</h3>
                {/* <p className="text-lg text-gray-500">
                  Sent {props.data.createdAt.toString().split("T")[0]}
                </p> */}
              </div>
              <p className="text-lg text-gray-600 mt-4">
                {data.startDate} to {data.endDate}
              </p>
              <p className="text-lg text-gray-600">{data.room}</p>
            </div>
          </div>
        }

        <label
          htmlFor="comment"
          className="block text-lg font-medium text-gray-700 my-4"
        >
          Message
        </label>
        <div className="shadow-sm block w-full h-48 p-4 sm:text-sm border-gray-200 border-2 rounded-lg">
          <p className="text-lg">{data.message}</p>
        </div>
      </div>
    </div>
  );
};

export default function Admin() {
  const router = useRouter();
  const utils = useUtils();
  const [paramId, setParamId] = useState("");
  const [activeId, setActiveId] = useState<number>();
  const { data, isLoading, refetch } = trpc.useQuery(["admin.get-messages"], {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    keepPreviousData: false,
  });

  useEffect(() => {
    if (data?.length) setParamId(JSON.stringify(data[0].id));
  }, []);
  useEffect(() => {
    data?.forEach((msg) => {
      utils.prefetchQuery(["admin.get-message-by-id", { id: msg.id }]);
    });
  }, []);

  const mutate = trpc.useMutation(["admin.delete-message"]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const deleteMsg = (id: number) => {
    mutate.mutate(
      { id },
      {
        onSuccess(input) {
          const cache = utils.getQueryData(["admin.get-messages"]) ?? [];
          utils.invalidateQueries(["admin.get-messages"]);

          const idx = cache.map((object) => object.id).indexOf(id);
          if (typeof cache[idx + 1] === "undefined") {
            const url = new URL(window.location.href);
            url.search = JSON.stringify(id - 1);
            setParamId(JSON.stringify(id - 1));
            window.history.replaceState({}, "", url.toString());
          } else {
            const url = new URL(window.location.href);
            url.search = JSON.stringify(id + 1);
            setParamId(JSON.stringify(id + 1));
            window.history.replaceState({}, "", url.toString());
          }
        },
      }
    );
  };
  if (!data?.length) {
    return (
      <main className="flex flex-col justify-center items-center gap-6 min-h-[100vh]">
        <h1 className="text-2xl font-semibold">
          {setCorrectPhrase(new Date())}
        </h1>
        <h1 className="text-2xl font-medium">
          You currently dont have any messages
        </h1>
      </main>
    );
  }

  return (
    <>
      <div>
        <MobileSidebar
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
          data={data ? data : []}
          activeId={activeId}
          setActiveId={setActiveId}
        />
        {/* Static sidebar for desktop */}
        <DesktopSidebar
          activeId={activeId}
          setActiveId={setActiveId}
          setParamId={setParamId}
          data={data ? data : []}
        />
        <div className="lg:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16">
            <button
              type="button"
              className="px-4  border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 p-8 flex justify-end cursor-pointer">
              <Header />
            </div>
          </div>
          <main className="lg:ml-36">
            <div className="flex justify-center my-12">
              <h1 className="text-2xl font-semibold">
                {setCorrectPhrase(new Date())}
              </h1>
            </div>
            <SingleBooking deleteMsg={deleteMsg} paramId={paramId} />
          </main>
        </div>
      </div>
    </>
  );
}
