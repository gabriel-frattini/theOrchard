import { ShowRooms, RoomImages } from "./ShowRooms";

import React from "react";
import { trpc } from "@/utils/trpc";

type Props = {};

export const Rooms = (props: Props) => {
  const { data, isLoading, error } = trpc.useQuery(["admin.get-rooms"]);

  if (data) {
    console.log(data);
    return (
      <>
        <ShowRooms data={data} />
      </>
    );
  }
};
