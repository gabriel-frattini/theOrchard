import { trpc } from "@/utils/trpc";
import kingroom from "@/images/kingroom.jpg";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";

export default function AdminRooms() {
  const { data, isLoading, error } = trpc.useQuery(["room.get-rooms"]);

  if (isLoading) return <></>;
  if (error) console.error(error);

  return (
    <>
      <Header />
      <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className="bg-white h-1/3 sm:h-2/3" />
        </div>
        <div className="relative max-w-[100rem] mx-auto">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
              Your Rooms
            </h2>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-12 lg:grid-cols-4 lg:max-w-none">
            {data?.map((room, idx) => (
              <div
                key={idx}
                className="flex flex-col rounded-lg shadow-lg overflow-hidden"
              >
                <a
                  href={`/admin/rooms/${room.roomSlug}`}
                  className="hover:underline"
                >
                  <div className="">
                    <Image
                      className="h-48 w-full object-cover"
                      src={room.roomImages[0].url}
                      alt=""
                      width={550}
                      height={350}
                    />
                  </div>
                </a>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-rose-600">
                      {room.roomName}
                    </p>
                    <p className="text-xl font-semibold text-gray-900">
                      £{room.roomPrice}
                    </p>
                    <p className="mt-3 text-base text-gray-500">
                      {room.roomDescription}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
