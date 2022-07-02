import { createRouter } from "./context";
import { BookingRouter } from "./booking";
import { AdminRouter } from "./admin";
import { RoomRouter } from "./room";

export const appRouter = createRouter()
  .merge("booking.", BookingRouter)
  .merge("admin.", AdminRouter)
  .merge("room.", RoomRouter);

export type AppRouter = typeof appRouter;
