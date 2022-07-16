import React, { ReactNode } from "react";
import { Tab } from "@headlessui/react";
import { PencilIcon } from "@heroicons/react/solid";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import { uploadImage } from "@/utils/cloudinary";
import { useMutation } from "react-query";
import Image from "next/image";
import Spinner from "./Spinner";
import { SP } from "next/dist/shared/lib/utils";

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
              {props.handleEdit && (
                <EditImage id={image.id} roomId={data.room?.id!} />
              )}

              <img src={image.url} alt={""} className="" />
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
  const [isSaving, setIsSaving] = React.useState(false);
  const [roomDesc, setRoomDesc] = React.useState<string>(
    props.room.roomDescription
  );
  const mutate = trpc.useMutation(["admin.update-room"], {
    onMutate() {
      setIsSaving(true);
    },
    onSuccess() {
      setIsSaving(false);
    },
  });

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
          className="absolute w-[200px]  right-0 top-0 inline-flex justify-center py-2  border border-transparent shadow-sm font-bold text-lg rounded-md text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
        >
          {isSaving ? <Spinner /> : "Save"}
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

interface EditImageProps<TItem> {
  roomId: number;
  id: number;
}

export function EditImage<TItem>(props: EditImageProps<TItem>) {
  const [isMutating, setIsMutating] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [uploadedImage, setUploadedImage] = React.useState<any>();
  const updateUserAvatarMutation = trpc.useMutation("admin.add-room", {
    onSuccess: () => {
      window.location.reload();
      setIsSaving(false);
    },
    onMutate() {
      setIsSaving(true);
    },
  });
  const uploadImageMutation = useMutation(
    (file: File) => {
      return uploadImage(file);
    },
    {
      onMutate() {
        setIsMutating(true);
      },
    }
  );

  const deleteImgMutation = trpc.useMutation(["admin.delete-img"], {
    onMutate() {
      setIsMutating(true);
    },
    onSuccess() {
      setIsMutating(false);
      window.location.reload();
    },
  });

  return (
    <div className="p-4 flex gap-4 rounded-2xl w-full">
      <div className="flex justify-center gap-2 py-3 items-center flex-1 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer">
        <button
          disabled={isMutating}
          onClick={() =>
            deleteImgMutation.mutate({
              id: props.id,
            })
          }
          className="font-medium"
        >
          {isMutating ? <Spinner /> : "Delete this image"}
        </button>
        {!isMutating && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        )}
      </div>
      <button
        className="flex flex-1 py-3 rounded-lg bg-gray-100 justify-center gap-2 items-center hover:bg-gray-200 cursor-pointer"
        onClick={() => {
          fileInputRef.current?.click();
        }}
      >
        Add new image
        <input
          ref={fileInputRef}
          name="user-image"
          type="file"
          accept=".jpg, .jpeg, .png, .gif"
          className="hidden"
          onChange={(event) => {
            const files = event.target.files;

            if (files && files.length > 0) {
              const file = files[0];
              setUploadedImage(file);
            }
          }}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>

      {uploadedImage && (
        <div className="absolute min-w-[300px] flex flex-col-reverse left-[50%] z-10 translate-x-[-50%] bg-white shadow-md px-4 py-6 rounded-md border-2">
          <div className=" grid grid-cols-2 items-center gap-4">
            <button
              className="bg-gray-100 col-start-1 rounded-md py-2 px-8 mt-2 hover:bg-gray-200 "
              onClick={async () => {
                const files = fileInputRef.current?.files;

                if (files && files.length > 0) {
                  uploadImageMutation.mutate(files[0], {
                    onSuccess: (uploadedImage) => {
                      updateUserAvatarMutation.mutate({
                        image: uploadedImage.url,
                        id: props.roomId,
                      });
                      setIsMutating(false);
                    },
                  });
                }
              }}
            >
              {isSaving || isMutating ? <Spinner /> : "Save"}
            </button>
            <button
              className="col-start-2 col-span-1  bg-gray-100 rounded-md py-2 mt-2 hover:bg-gray-200"
              onClick={() => {
                fileInputRef.current!.value = "";
                URL.revokeObjectURL(uploadedImage);
                setUploadedImage(null);
              }}
            >
              Remove photo
            </button>
          </div>
          <img
            width={640}
            height={400}
            src={URL.createObjectURL(uploadedImage)}
          />
        </div>
      )}
    </div>
  );
}
