import { ShowRooms, RoomImages } from "./ShowRooms";

import React from "react";

type Props = {};

export const Rooms = (props: Props) => {
  return (
    <>
      <ShowRooms childComp={<RoomImages />} />
    </>
  );
};
