import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MenuAlt2Icon, XIcon } from "@heroicons/react/outline";

import { trpc, useUtils } from "@/utils/trpc";
import { setCorrectPhrase } from "@/utils/functions";
import { Header } from "@/components/Header";
import Spinner from "@/components/Spinner";

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

interface Props {
  data: messageProps[];
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
  setParamId,
}: Props) => {
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
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full"
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
                            activeId === person.id
                              ? "bg-gray-50 cursor-pointer"
                              : "bg-white cursor-pointer"
                          }
                          onClick={() => {
                            setActiveId(person.id);
                            const url = new URL(window.location.href);
                            url.search = JSON.stringify(person.id);
                            window.history.replaceState({}, "", url.toString());
                            setParamId(JSON.stringify(person.id));
                          }}
                        >
                          <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-rose-500">
                            <div className="flex-1 min-w-0">
                              <span
                                className="absolute inset-0"
                                aria-hidden="true"
                              />
                              <p className="text-lg font-display text-gray-900">
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

const DesktopSidebar = ({ data, activeId, setActiveId, setParamId }: Props) => {
  return (
    <div className="hidden lg:flex lg:w-96 lg:flex-col lg:fixed lg:inset-y-0">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex flex-col flex-grow pt-5 bg-white overflow-y-auto">
        <nav
          className="h-full overflow-y-auto border-r-2 z-10"
          aria-label="Directory"
        >
          <ul role="list" className="relative z-10 divide-y divide-gray-200">
            {data
              .sort(
                (a: messageProps, b: messageProps) =>
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime()
              )
              .map((person: messageProps, idx: number) => (
                <div className="cursor-pointer z-12">
                  <li
                    key={idx}
                    className={
                      activeId === person.id
                        ? "bg-gray-50 hover:bg-gray-50 cursor-pointer "
                        : "bg-white cursor-pointer hover:bg-gray-50"
                    }
                    onClick={() => {
                      setActiveId(person.id);
                      const url = new URL(window.location.href);

                      url.search = JSON.stringify(person.id);
                      window.history.replaceState({}, "", url.toString());
                      setParamId(JSON.stringify(person.id));
                    }}
                  >
                    <div className="relative px-6 py-5 flex items-center space-x-3">
                      <div className="flex-1 min-w-0">
                        <span className="flex justify-between">
                          <p className="text-lg font-display text-gray-900">
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
                </div>
              ))}
          </ul>
        </nav>
        <div className="mt-5 flex-1 flex flex-col"></div>
      </div>
    </div>
  );
};

const SingleBooking: React.FC<{
  deleteMsg: any;
  paramId: string;
  isDeletingMsg: boolean;
}> = (props) => {
  const { data, isLoading } = trpc.useQuery([
    "admin.get-message-by-id",
    {
      id: parseInt(props.paramId),
    },
  ]);
  if (isLoading || !data) return <></>;

  return (
    <div className="py-6 ">
      <div className="max-w-7xl flex justify-between mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-display text-gray-900">{data!.name}</h2>
        {!props.isDeletingMsg ? (
          <XIcon
            width={24}
            height={24}
            className="cursor-pointer hover:bg-gray-100 rounded-full"
            onClick={() => props.deleteMsg(data!.id)}
          />
        ) : (
          <Spinner />
        )}
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {
          <div className="flex space-x-3">
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-display  mt-4 ">{data!.email}</h3>
                {/* <p className="text-lg text-gray-500">
                  Sent {props.data.createdAt.toString().split("T")[0]}
                </p> */}
              </div>
              <p className="text-lg text-gray-600 mt-4">
                {data!.startDate} to {data!.endDate}
              </p>
              <p className="text-lg text-gray-600">{data!.room}</p>
            </div>
          </div>
        }

        <label
          htmlFor="comment"
          className="block text-lg font-display text-gray-700 my-4"
        >
          Message
        </label>
        <div className="shadow-sm block w-full min-h-48 h-fit p-4 sm:text-sm border-gray-200 border-2 rounded-lg">
          <p className="text-lg">{data!.message}</p>
        </div>
      </div>
    </div>
  );
};

export default function Admin() {
  const utils = useUtils();
  const [paramId, setParamId] = useState("");
  const [activeId, setActiveId] = useState<number>();
  const [isDeletingMsg, setIsDeletingMsg] = useState(false);
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

  const mutate = trpc.useMutation(["admin.delete-message"], {
    onMutate() {
      setIsDeletingMsg(true);
    },
  });

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
          setIsDeletingMsg(false);
        },
      }
    );
  };
  if (!data?.length) {
    return (
      <div className="">
        <Header />
        <main className="flex flex-col justify-center items-center gap-6 mt-36">
          <h1 className="text-2xl font-semibold">
            {setCorrectPhrase(new Date())}
          </h1>
          <h1 className="text-2xl font-display">
            You currently dont have any messages
          </h1>
        </main>
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="absolute top-[57px] left-5  z-10 h-16">
          <button
            type="button"
            className="px-4  border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Header />
        <MobileSidebar
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
          data={data as messageProps[]}
          activeId={activeId}
          setActiveId={setActiveId}
          setParamId={setParamId}
        />
        {/* Static sidebar for desktop */}
        <DesktopSidebar
          activeId={activeId}
          setActiveId={setActiveId}
          setParamId={setParamId}
          data={data as messageProps[]}
        />
        <div className="lg:pl-64 flex flex-col flex-1">
          <main className="lg:ml-36  mt-36">
            <div className="flex justify-center my-12">
              <h1 className="text-2xl font-semibold">
                {setCorrectPhrase(new Date())}
              </h1>
            </div>
            <SingleBooking
              isDeletingMsg={isDeletingMsg}
              deleteMsg={deleteMsg}
              paramId={paramId}
            />
          </main>
        </div>
      </div>
    </>
  );
}
