import { z } from "zod";

export const createBooking = z.object({
  name: z.string().min(3).max(32),
  email: z.string().min(3).max(32),
  startDate: z.string(),
  endDate: z.string(),
  room: z.string(),
  message: z.string(),
});

export type createBookingInput = z.TypeOf<typeof createBooking>

