/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { clerkClient } from "@clerk/nextjs";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

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
        await ctx.prisma.tweet.create({
          data: {
            content,
            mediaUrl,
            createdAt: new Date(),
            author: {
              connect: {
                id: userId,
              },
            },
          },
        });
      } catch (e) {
        console.log("Error while creating a tweet", e);
      }
    }),
  getFirstTen: protectedProcedure.query(async ({ ctx }) => {
    const signedInUserId = ctx.auth.userId;
    const tweets = await ctx.prisma.tweet.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        bookmarkedBy: true,
        content: true,
        userId: true,
        mediaUrl: true,
        createdAt: true,
        id: true,
        likedBy: true,
      },
    });
    return await Promise.all(
      tweets.map(async (t) => {
        const user = await clerkClient.users.getUser(t.userId);
        const hasBookmarked = !!t.bookmarkedBy.find(
          (u) => u.id === signedInUserId
        );
        const hasLiked = !!t.likedBy.find((u) => u.id === signedInUserId);
        return {
          user: {
            name: user.firstName,
            lastName: user.lastName,
            profilePicture: user.profileImageUrl,
            userName: user.username,
          },
          tweet: {
            content: t.content,
            id: t.id,
            mediaUrl: t.mediaUrl ?? "",
            createdAt: t.createdAt,
            hasBookmarked,
            hasLiked,
            likesCount: t.likedBy.length,
          },
        };
      })
    );
  }),
  bookmark: protectedProcedure
    .input(
      z.object({
        tweetId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.auth.userId;
      const tweetId = input.tweetId;
      await ctx.prisma.tweet.update({
        data: {
          bookmarkedBy: {
            connect: {
              id: userId,
            },
          },
        },
        where: {
          id: tweetId,
        },
      });
      await ctx.prisma.user.update({
        data: {
          bookmarks: {
            connect: {
              id: tweetId,
            },
          },
        },
        where: {
          id: userId,
        },
      });
      return tweetId;
    }),
  like: createTRPCRouter({
    add: protectedProcedure
      .input(
        z.object({
          tweetId: z.string(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const userId = ctx.auth.userId;
        const tweetId = input.tweetId;
        await ctx.prisma.tweet.update({
          data: {
            likedBy: {
              connect: {
                id: userId,
              },
            },
          },
          where: {
            id: tweetId,
          },
        });
        await ctx.prisma.user.update({
          data: {
            likes: {
              connect: {
                id: tweetId,
              },
            },
          },
          where: {
            id: userId,
          },
        });
        return tweetId;
      }),
    remove: protectedProcedure
      .input(
        z.object({
          tweetId: z.string(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const userId = ctx.auth.userId;
        const tweetId = input.tweetId;
        await ctx.prisma.tweet.update({
          data: {
            likedBy: {
              disconnect: {
                id: userId,
              },
            },
          },
          where: {
            id: tweetId,
          },
        });
        await ctx.prisma.user.update({
          data: {
            likes: {
              disconnect: {
                id: tweetId,
              },
            },
          },
          where: {
            id: userId,
          },
        });
        return tweetId;
      }),
  }),
});
