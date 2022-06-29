import { createRouter } from "./context";
import { BookingRouter } from "./booking";
import { AdminRouter } from "./admin";

export const appRouter = createRouter()
  .merge("booking.", BookingRouter)
  .merge("admin.", AdminRouter);

export type AppRouter = typeof appRouter;
