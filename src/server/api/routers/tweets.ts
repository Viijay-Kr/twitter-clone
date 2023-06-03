/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { clerkClient } from "@clerk/nextjs";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const tweetsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        content: z.string().max(280),
        mediaUrl: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { userId } = ctx.auth;
        const content = input.content;
        const mediaUrl = input.mediaUrl;
        await prisma.tweet.create({
          data: {
            userId,
            content,
            mediaUrl,
            createdAt: new Date(),
          },
        });
      } catch (e) {
        console.log("Error while creating a tweet", e);
      }
    }),
  getFirstTen: protectedProcedure.query(async ({ ctx }) => {
    const tweets = await ctx.prisma.tweet.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
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
          mediaUrl: t.mediaUrl ?? "",
          createdAt: t.createdAt,
        };
      })
    );
  }),
});
