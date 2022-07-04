import { createRouter } from "./context";
import { z } from "zod";
import { createBooking } from "../schema/booking.schema";
import { prisma } from "../utils/prisma";
import * as trpc from "@trpc/server";

export const BookingRouter = createRouter().mutation("create-booking", {
  input: createBooking,
  async resolve({ input }) {
    try {
      const booking = await prisma.booking.create({
        data: {
          ...input,
        },
      });
      return { id: booking.id };
    } catch (error) {
      new trpc.TRPCError({
        code: "BAD_REQUEST",
        message: "Can not create booking",
      });
    }
  },
});
