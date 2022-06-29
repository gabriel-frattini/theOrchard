import { createRouter } from "./context";
import { prisma } from "../utils/prisma";
import { z } from "zod";

export const AdminRouter = createRouter()
  .query("login", {
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
        return;
      }
      return { admin: true, hasToken: false };
    },
  })

  .query("get-messages", {
    async resolve({ ctx }) {
      if (ctx.token === process.env.NEXT_PUBLIC_ADMIN_TOKEN) {
      return await prisma.booking.findMany();
      }
    },
  });
