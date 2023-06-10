import { z } from "zod";
import { clerkClient } from "@clerk/nextjs";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const usersRouter = createTRPCRouter({
  get: protectedProcedure
    .input(z.object({ limit: z.number() }))
    .query(async ({ ctx, input }) => {
      const signedInUserId = ctx.auth.userId;
      const users = await ctx.prisma.user.findMany({
        where: {
          NOT: {
            id: signedInUserId,
          },
        },
        select: {
          followers: true,
          id: true,
        },
        take: input.limit,
      });
      const clerkUsers = await Promise.all(
        users.map(async (user) => {
          const isFollowing = !!user.followers.find(
            (fu) => fu.id === signedInUserId
          );
          try {
            const clerkUser = await clerkClient.users.getUser(user.id);
            return {
              firstName: clerkUser.firstName,
              profilePic: clerkUser.profileImageUrl,
              userName: clerkUser.username,
              id: user.id,
              isFollowing,
            };
          } catch (e) {
            console.log(user.id);
          }
        })
      );
      return clerkUsers.filter((user) => !!user);
    }),
  follow: createTRPCRouter({
    add: protectedProcedure
      .input(z.object({ followingId: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const followingId = input.followingId;
        const signedInUserId = ctx.auth.userId;
        await ctx.prisma.user.update({
          where: {
            id: signedInUserId,
          },
          data: {
            following: {
              connect: {
                id: followingId,
              },
            },
          },
        });
      }),
    remove: protectedProcedure
      .input(z.object({ followingId: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const followingId = input.followingId;
        const signedInUserId = ctx.auth.userId;
        await ctx.prisma.user.update({
          where: {
            id: signedInUserId,
          },
          data: {
            following: {
              disconnect: {
                id: followingId,
              },
            },
          },
        });
      }),
  }),
});
