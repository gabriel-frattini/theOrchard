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
      const admin = await prisma.user.findFirst({
        where: { passphrase: input.passphrase },
      });
      if (!admin) {
        return { redirect: "/login-admin" };
      }

      ctx.res?.setHeader(
        "Set-Cookie",
        serialize("admin-token", process.env.NEXT_PUBLIC_ADMIN_TOKEN!, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7 * 52,
        })
      );

      return { redirect: "/admin" };
    },
  })

  .query("get-messages", {
    async resolve({ ctx }) {
      if (ctx.token === process.env.NEXT_PUBLIC_ADMIN_TOKEN) {
        const messages = await prisma.booking.findMany();
        if (!messages.length) return [];
        return messages;
      }
    },
  })

  .query("get-message-by-id", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input }) {
      const msg = await prisma.booking.findUnique({
        where: {
          ...input,
        },
      });

      return msg;
    },
  })

  .mutation("delete-message", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input }) {
      await prisma.booking.delete({
        where: {
          id: input.id,
        },
      });
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
  })
  .mutation("add-room", {
    input: z.object({
      image: z.string(),
      id: z.number(),
    }),
    async resolve({ input }) {
      const img = await prisma.imageUrl.create({
        data: {
          url: input.image,
          imageUrlId: input.id,
        },
      });
      return { img };
    },
  })
  .mutation("delete-img", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input: { id } }) {
      await prisma.imageUrl.delete({
        where: {
          id,
        },
      });
    },
  });
