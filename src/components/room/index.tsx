import { ShowRooms } from "./ShowRooms";

import React from "react";
import { trpc } from "@/utils/trpc";

interface Props {}

interface roomProps {
  id: number;
  roomName: string;
  roomPrice: number;
  roomDescription: string;
  imageUrl: string;
  roomSlug: string;
  roomImages: any;
}

export const Rooms = (props: Props) => {
  const { data, isLoading, error } = trpc.useQuery(["room.get-rooms"]);

  if (data) {
    return (
      <>
        <ShowRooms data={data as unknown as roomProps[]} />
      </>
    );
  }
  return <></>;
};
