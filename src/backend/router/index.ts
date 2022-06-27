import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "@/backend/utils/prisma";

export const appRouter = trpc.router().mutation("create-booking", {
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
    return { success: true, data: booking };
  },
});

export type AppRouter = typeof appRouter;
