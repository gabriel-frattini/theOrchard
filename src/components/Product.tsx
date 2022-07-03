import React, { ReactNode } from "react";
import { Tab } from "@headlessui/react";
import { PencilIcon } from "@heroicons/react/solid";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface ParentCompProps {
  childComp?: JSX.Element;
  handleEdit?: () => void;
  isEditing?: Boolean;
  room?: any;
}

export const Product: React.FC<ParentCompProps> = (props) => {
  const router = useRouter();

  const { data, isLoading, error } = trpc.useQuery([
    "room.get-room-by-slug",
    { roomSlug: String(router.query.slug) },
  ]);

  if (isLoading) return <></>;
  if (error) console.error(error);

  return (
    <>
      <Tab.Group as="div" className="flex flex-col-reverse">
        {/* Image selector */}
        <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
          <Tab.List className="grid grid-cols-4 gap-6">
            {data?.room?.roomImages.map((image) => (
              <Tab
                key={image.id}
                className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
              >
                {({ selected }) => (
                  <>
                    <span className="sr-only">{data.room?.roomName}</span>
                    <span className="absolute inset-0 rounded-md overflow-hidden">
                      <img
                        src={image.url}
                        alt=""
                        className="w-full h-full object-center object-cover"
                      />
                    </span>
                    <span
                      className={classNames(
                        selected ? "ring-indigo-500" : "ring-transparent",
                        "absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none"
                      )}
                      aria-hidden="true"
                    />
                  </>
                )}
              </Tab>
            ))}
          </Tab.List>
        </div>

        <Tab.Panels className="w-full aspect-w-1 aspect-h-1">
          {data?.room?.roomImages.map((image) => (
            <Tab.Panel key={image.id}>
              <img
                src={image.url}
                alt={""}
                className="w-full h-full object-center object-cover sm:rounded-lg"
              />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
      {props.handleEdit ? (
        <EditRoomDetails handleEdit={props.handleEdit} room={props.room.room} />
      ) : (
        <div>
          <RoomDetails room={data?.room} />
          {props.childComp}
        </div>
      )}
    </>
  );
};

const RoomDetails = (props: ParentCompProps) => {
  return (
    <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0 relative">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
        {props?.room.roomName}
      </h1>
      <div className="mt-3">
        <h2 className="sr-only">Product information</h2>
        <p className="text-3xl text-gray-900">{props.room.roomPrice}</p>
      </div>
      <div className="mt-6">
        <div
          className="text-base text-gray-700 space-y-6 mb-12"
          dangerouslySetInnerHTML={{ __html: props.room.roomDescription }}
        />
      </div>
      {props.childComp}
    </div>
  );
};

const EditRoomDetails = (props: ParentCompProps) => {
  const [roomName, setRoomName] = React.useState<string>(props.room.roomName);
  const [roomPrice, setRoomPrice] = React.useState<any>(props.room.roomPrice);
  const [roomDesc, setRoomDesc] = React.useState<string>(
    props.room.roomDescription
  );
  const mutate = trpc.useMutation(["admin.update-room"]);

  const handleSaveNewRoomDetails = () => {
    mutate.mutate({
      id: Number(props.room.id),
      roomName,
      roomPrice: Number(roomPrice),
      roomDescription: roomDesc,
    });
  };

  return (
    <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0 relative">
      <form onSubmit={handleSaveNewRoomDetails}>
        <button
          type="submit"
          className="absolute right-0 top-0 inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save
        </button>
      </form>
      <h1 className="">
        <input
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="text-3xl font-extrabold tracking-tight text-gray-900 placeholder-gray-900 border-none"
          type="text"
        />
      </h1>
      <div className="mt-3">
        <h2 className="sr-only">Product information</h2>
        <input
          type="text"
          value={roomPrice}
          onChange={(e) => setRoomPrice(e.target.value)}
          className="text-3xl placeholder-gray-900 text-gray-900 border-none"
        />
      </div>
      <div className="mt-6">
        <h3 className="sr-only">Description</h3>

        <div className="text-base text-gray-700 space-y-6 mb-12" />
        <textarea
          rows={10}
          cols={50}
          value={roomDesc}
          onChange={(e) => setRoomDesc(e.target.value)}
          className="placeholder-text-gray-700 border-none"
        />
      </div>
      {props.childComp}
    </div>
  );
};
