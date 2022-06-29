import React from "react";
import { ShowRooms } from "@/components/room/ShowRooms";
import { Product } from "@/components/Product";

type Props = {};

const AdminEdit = (props: Props) => {
  return (
    <div>
      <ShowRooms />
      <Product />
    </div>
  );
};

export default AdminEdit;
