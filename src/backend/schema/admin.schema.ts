import { z } from "zod";

export const getBooking = z.object({
  name: z.string().min(3).max(32),
  email: z.string().min(3).max(32),
  startDate: z.string(),
  endDate: z.string(),
  room: z.string(),
  message: z.string(),
  createdAt: z.date(),
});

export type getBookingQuery = z.TypeOf<typeof getBooking>;

export const updateRoom = z.object({
  id: z.number(),
  roomName: z.string(),
  roomPrice: z.number(),
  roomDescription: z.string(),
});

export type updateRoomSchema = z.TypeOf<typeof updateRoom>;
