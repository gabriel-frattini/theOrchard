import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { MenuAlt2Icon, XIcon } from "@heroicons/react/outline";

import { trpc, useUtils } from "@/utils/trpc";
import Link from "next/link";
import { setCorrectPhrase } from "@/utils/functions";
import { useRouter } from "next/router";

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
}

const MobileSidebar = ({
  data,
  setSidebarOpen,
  sidebarOpen,
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
                        <li key={idx} className="bg-white">
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

const DesktopSidebar = ({ data, setActiveMsg }: childCompsProps) => {
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
                className="bg-white  hover:cursor-pointer"
                onClick={() => setActiveMsg(person)}
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

const SingleBooking: React.FC<{ data: any; deleteMsg: () => void }> = (
  props
) => {
  if (!props.data) return <></>;

  return (
    <div className="py-6 ">
      <div className="max-w-7xl flex justify-between mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-medium text-gray-900">
          {props.data.name}
        </h2>
        <XIcon
          width={24}
          height={24}
          className="cursor-pointer"
          onClick={() => props.deleteMsg()}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {
          <div className="flex space-x-3">
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium  mt-4 ">
                  {props.data.email}
                </h3>
                {/* <p className="text-lg text-gray-500">
                  Sent {props.data.createdAt.toString().split("T")[0]}
                </p> */}
              </div>
              <p className="text-lg text-gray-600 mt-4">
                {props.data.startDate} to {props.data.endDate}
              </p>
              <p className="text-lg text-gray-600">{props.data.room}</p>
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
          <p className="text-lg">{props.data.message}</p>
        </div>
      </div>
    </div>
  );
};

export default function Admin() {
  const utils = useUtils();
  const { data, isLoading, refetch } = trpc.useQuery(["admin.get-messages"], {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    keepPreviousData: false,
  });

  console.log("isloading", isLoading, "data", data);

  // useEffect(() => {
  //   data?.forEach((msg) => {
  //     utils.prefetchQuery(["admin.get-message-by-id", { id: msg.id }]);
  //   });
  // }, []);

  // if (data) {
  const mutate = trpc.useMutation(["admin.delete-message"]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMsg, setActiveMsg] = useState(data ? data[0] : { id: 0 });

  const deleteMsg = (id: number) => {
    mutate.mutate(
      { id },
      {
        onSuccess(input) {
          utils.invalidateQueries(["admin.get-messages"]);
        },
      }
    );

    console.log("data", data, "isloading", isLoading);
  };

  return (
    <>
      <div>
        <MobileSidebar
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
          data={data ? data : []}
        />
        {/* Static sidebar for desktop */}
        <DesktopSidebar data={data ? data : []} setActiveMsg={setActiveMsg} />
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
              <Link href="/">
                <h1 className="font-medium text-xl">The Orchard</h1>
              </Link>
            </div>
          </div>
          <main className="lg:ml-36">
            <div className="flex justify-center my-12">
              <h1 className="text-2xl font-semibold">
                {setCorrectPhrase(new Date())}
              </h1>
            </div>
            <SingleBooking
              data={activeMsg}
              deleteMsg={() => deleteMsg(activeMsg.id)}
            />
          </main>
        </div>
      </div>
    </>
  );

  // return (
  //   <main className="flex flex-col justify-center items-center gap-6 min-h-[100vh]">
  //     <h1 className="text-2xl font-semibold">{setCorrectPhrase(new Date())}</h1>
  //     <h1 className="text-2xl font-medium">
  //       You currently dont have any messages
  //     </h1>
  //   </main>
  // );
}
