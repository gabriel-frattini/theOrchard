import React from "react";
import { ShowRooms } from "@/components/room/ShowRooms";
import { Product } from "@/components/Product";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";

type Props = {};

const AdminEdit = (props: Props) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const router = useRouter();

  const { id } = router.query;
  const slug = Number(id);

  const { data, isLoading, error } = trpc.useQuery([
    "admin.get-room-by-id",
    { id: slug },
  ]);

  if (isLoading) return <></>;
  if (error) console.error(error);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        <Product handleEdit={handleEdit} room={data} isEditing={isEditing} />
      </div>
    </div>
  );
};

export default AdminEdit;
