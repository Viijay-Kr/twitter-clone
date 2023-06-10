import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import User from "~/components/User/User";
import { api } from "~/utils/api";

export default function WhoToFollow() {
  const queryClient = useQueryClient();
  const users = api.users.get.useQuery({ limit: 4 });
  const usersKey = getQueryKey(api.users.get, undefined, "query");
  queryClient.setQueryDefaults(usersKey, { staleTime: 30 * 60 * 1000 });
  const followUser = api.users.follow.add.useMutation({
    onSuccess: async () => {
      await queryClient.refetchQueries(usersKey);
    },
  });
  const unFollowUser = api.users.follow.remove.useMutation({
    onSuccess: async () => {
      await queryClient.refetchQueries(usersKey);
    },
  });
  return (
    <div className="mt-[2rem] flex h-[30%] w-2/3 flex-col items-start gap-[1rem] rounded-lg bg-slate-800 p-[1rem]">
      <h2 className="text-xl font-bold">Who to follow</h2>
      <ul className="flex w-full flex-col gap-[1rem]">
        {users.data?.map((user) =>
          user && user.firstName && user.userName ? (
            <li key={user.id}>
              <User
                firstName={user.firstName}
                userName={user.userName}
                profilePic={user.profilePic}
                isFollowed={user.isFollowing}
                onFollowToggle={() => {
                  if (user.isFollowing) {
                    unFollowUser.mutate({ followingId: user.id });
                  }
                  followUser.mutate({ followingId: user.id });
                }}
              />
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
}
