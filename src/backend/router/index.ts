import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "@/backend/utils/prisma";

export const appRouter = trpc
  .router()
  .query("get-pokemon-pair", {
    async resolve() {
      const [first, second] = [1, 2];

      const bothPokemon = await prisma.pokemon.findMany({
        where: { id: { in: [first, second] } },
      });

      if (bothPokemon.length !== 2)
        throw new Error("Failed to find two pokemon");

      return { firstPokemon: bothPokemon[0], secondPokemon: bothPokemon[1] };
    },
  })
  .mutation("cast-vote", {
    input: z.object({
      votedFor: z.number(),
      votedAgainst: z.number(),
    }),
    async resolve({ input }) {
      const voteInDb = await prisma.vote.create({
        data: {
          votedAgainstId: input.votedAgainst,
          votedForId: input.votedFor,
        },
      });
      return { success: true, vote: voteInDb };
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
