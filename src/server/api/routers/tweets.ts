/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { clerkClient } from "@clerk/nextjs";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const tweetsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ content: z.string().max(280) }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx.auth;
      const content = input.content;
      await prisma.tweet.create({
        data: {
          userId,
          content,
        },
      });
    }),
  getFirstTen: protectedProcedure.query(async ({ ctx }) => {
    const tweets = await ctx.prisma.tweet.findMany({
      take: 10,
    });
    return await Promise.all(
      tweets.map(async (t) => {
        const user = await clerkClient.users.getUser(t.userId);
        return {
          name: user.firstName,
          lastName: user.lastName,
          profilePicture: user.profileImageUrl,
          userName: user.username,
          tweet: t.content,
          id: t.id,
        };
      })
    );
  }),
});
