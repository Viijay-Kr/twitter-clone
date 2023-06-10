import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import TweetCard from "~/components/TweetCard/TweetCard";
import { api } from "~/utils/api";

export default function AllTweets(props: { from: "For you" | "Following" }) {
  const queryClient = useQueryClient();
  const tweetsKey = getQueryKey(api.tweets.getFirstTen, undefined, "query");
  queryClient.setQueryDefaults(tweetsKey, { staleTime: 30 * 60 * 1000 });

  const tweets = api.tweets.getFirstTen.useQuery();
  const bookmarkTweet = api.tweets.bookmark.useMutation({
    async onSuccess() {
      await queryClient.refetchQueries(tweetsKey);
    },
  });
  const onAddorRemoveLikeSuccess = async () => {
    await queryClient.refetchQueries(tweetsKey);
  };
  const addLike = api.tweets.like.add.useMutation({
    onSuccess: onAddorRemoveLikeSuccess,
  });
  const removeLike = api.tweets.like.remove.useMutation({
    onSuccess: onAddorRemoveLikeSuccess,
  });

  return (
    <div className="flex flex-col gap-[1rem] ">
      {tweets.data?.map(
        ({
          user: { name, userName, lastName, profilePicture },
          tweet: {
            id,
            mediaUrl,
            createdAt,
            hasBookmarked,
            content,
            hasLiked,
            likesCount,
          },
        }) => (
          <TweetCard
            key={id}
            tweet={{
              mediaUrl,
              content,
              createdAt,
              isBookeMarked: hasBookmarked,
              isLiked: hasLiked,
              likesCount,
            }}
            user={{
              firstName: name,
              lastName,
              userName,
              profilePic: profilePicture,
            }}
            actions={{
              onBookMark() {
                bookmarkTweet.mutate({ tweetId: id });
              },
              onLikeToggle() {
                if (hasLiked) {
                  removeLike.mutate({ tweetId: id });
                } else {
                  addLike.mutate({ tweetId: id });
                }
              },
            }}
          />
        )
      )}
    </div>
  );
}
