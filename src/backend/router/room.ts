import { createRouter } from "./context";
import { prisma } from "../utils/prisma";
import { z } from "zod";

export const RoomRouter = createRouter()
  .query("get-rooms", {
    async resolve() {
      return await prisma.room.findMany({ include: { roomImages: true } });
    },
  })

  .query("get-room-by-slug", {
    input: z.object({ roomSlug: z.string() }),
    async resolve({ input }) {
      const room = await prisma.room.findFirst({
        where: {
          roomSlug: input.roomSlug,
        },
        include: {
          roomImages: true,
        },
      });
      return {
        room,
      };
    },
  });
