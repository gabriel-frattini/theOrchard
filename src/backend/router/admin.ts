import { createRouter } from "./context";
import { prisma } from "../utils/prisma";
import { z } from "zod";
import { serialize } from "cookie";
import { updateRoom } from "../schema/admin.schema";

require("dotenv").config();

export const AdminRouter = createRouter()
  .mutation("login", {
    input: z.object({
      passphrase: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (ctx.token === process.env.NEXT_PUBLIC_ADMIN_TOKEN) {
        return { admin: true, hasToken: true };
      }
      const admin = await prisma.user.findFirst({
        where: { passphrase: input.passphrase },
      });
      if (!admin) {
        return { admin: false };
      }

      ctx.res?.setHeader(
        "Set-Cookie",
        serialize(
          "admin-token",
          process.env.NEXT_PUBLIC_ADMIN_TOKEN || "admin",
          {
            path: "/",
          }
        )
      );

      return { admin: true };
    },
  })

  .query("get-messages", {
    async resolve({ ctx }) {
      if (ctx.token === process.env.NEXT_PUBLIC_ADMIN_TOKEN) {
        return await prisma.booking.findMany();
      }
    },
  })

  .mutation("update-room", {
    input: updateRoom,
    async resolve({ input }) {
      await prisma.room.update({
        where: {
          id: input.id,
        },
        data: {
          roomName: input.roomName,
          roomPrice: input.roomPrice,
          roomDescription: input.roomDescription,
        },
      });
    },
  });
