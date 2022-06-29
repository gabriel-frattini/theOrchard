import { createRouter } from "./context";
import { z } from "zod";
import { createBooking } from "../schema/booking.schema";
import { prisma } from "../utils/prisma";

export const BookingRouter = createRouter().mutation("create-booking", {
  input: createBooking,
  async resolve({ input }) {
    const booking = await prisma.booking.create({
      data: {
        ...input,
      },
    });
    return { data: booking };
  },
});
