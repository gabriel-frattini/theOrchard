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

let data = {
  data: [
    {
      roomName: "Deluxe Room",
      roomSlug: "deluxe-room",
      roomPrice: 100,
      roomDescription:
        "A room with a double bed, your own bathroom and a lovely view over the ocean.",
      roomImages: [
        {
          url: "https://res.cloudinary.com/daaqbxnj6/image/upload/v1656766250/theOrchard/deluxeroom_k34ji5.jpg",
        },
      ],
    },
    {
      roomName: "King Room",
      roomSlug: "king-room",
      roomPrice: 100,
      roomDescription:
        "A room with a double bed, your own bathroom and a lovely view over the ocean.",
      roomImages: [
        {
          url: "https://res.cloudinary.com/daaqbxnj6/image/upload/v1656766250/theOrchard/deluxeroom_k34ji5.jpg",
        },
      ],
    },
    {
      roomName: "Queen Room",
      roomSlug: "queen-room",
      roomPrice: 100,
      roomDescription:
        "A room with a double bed, your own bathroom and a lovely view over the ocean.",
      roomImages: [
        {
          url: "https://res.cloudinary.com/daaqbxnj6/image/upload/v1656766250/theOrchard/deluxeroom_k34ji5.jpg",
        },
      ],
    },
    {
      roomName: "Twin Room",
      roomSlug: "twin-room",
      roomPrice: 100,
      roomDescription:
        "A room with a double bed, your own bathroom and a lovely view over the ocean.",
      roomImages: [
        {
          url: "https://res.cloudinary.com/daaqbxnj6/image/upload/v1656766250/theOrchard/deluxeroom_k34ji5.jpg",
        },
      ],
    },
  ],
};

export const Rooms = (props: Props) => {
  // const { data: t, isLoading, error } = trpc.useQuery(["room.get-rooms"]);
  // console.log(t);
  return (
    <>
      <ShowRooms data={data.data as unknown as roomProps[]} />
    </>
  );
};
