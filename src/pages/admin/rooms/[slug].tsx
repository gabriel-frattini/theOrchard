import React from "react";
import { ShowRooms } from "@/components/room/ShowRooms";
import { Product } from "@/components/Product";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { Header } from "@/components/Header";

type Props = {};

const AdminEdit = (props: Props) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const router = useRouter();

  const slug = router.query;
  const { data, isLoading, error } = trpc.useQuery([
    "room.get-room-by-slug",
    { roomSlug: String(router.query.slug) },
  ]);

  if (isLoading) return <></>;
  if (error) console.error(error);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="">
      <Header />
      <div className=" flex mt-[50px] items-center mx-auto min-h-[100vh] sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start ">
          <Product handleEdit={handleEdit} room={data} isEditing={isEditing} />
        </div>
      </div>
    </div>
  );
};

export default AdminEdit;
