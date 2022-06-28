import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "@/backend/utils/prisma";
import { createRouter } from "./context";
require("dotenv").config();

export const appRouter = createRouter()
  .mutation("create-booking", {
    input: z.object({
      name: z.string().min(3).max(32),
      email: z.string().min(3).max(32),
      startDate: z.string(),
      endDate: z.string(),
      room: z.string(),
      message: z.string(),
    }),
    async resolve({ input }) {
      const booking = await prisma.booking.create({
        data: {
          ...input,
        },
      });
      return { data: booking };
    },
  })

  .query("login", {
    input: z.object({
      passphrase: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (ctx.token === process.env.NEXT_PUBLIC_ADMIN_TOKEN)
        return { admin: true, hasToken: true };
      const admin = await prisma.user.findFirst({
        where: { passphrase: input.passphrase },
      });
      if (!admin) {
        return;
      }
      return { admin: true, hasToken: false };
    },
  });

export type AppRouter = typeof appRouter;
