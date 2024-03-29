import React from "react";
import { Room } from "@/components/Room";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { Header } from "@/components/Header";

type Props = {};

const AdminEdit = (props: Props) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const router = useRouter();

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
    <>
      <Header />
      <div className="flex items-center mx-auto min-h-[100vh] sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid mt-[100px] lg:grid-cols-2 lg:gap-x-8 lg:items-start mx-auto">
          <Room handleEdit={handleEdit} room={data} isEditing={isEditing} />
        </div>
      </div>
    </>
  );
};

export default AdminEdit;
