import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import TweetCard from "~/components/TweetCard/TweetCard";
import { api } from "~/utils/api";

export default function AllTweets(props: { from: "For you" | "Following" }) {
  const tweets = api.tweets.getFirstTen.useQuery();
  const queryClient = useQueryClient();
  const tweetsKey = getQueryKey(api.tweets.getFirstTen, undefined, "query");
  queryClient.setQueryDefaults(tweetsKey, { staleTime: 30 * 60 * 1000 });

  return (
    <div className="flex flex-col gap-[1rem] ">
      {tweets.data?.map(
        ({
          tweet,
          name,
          userName,
          lastName,
          id,
          profilePicture,
          mediaUrl,
          createdAt,
        }) => (
          <TweetCard
            key={id}
            user={{
              firstName: name,
              lastName,
              userName,
              profilePic: profilePicture,
            }}
            mediaUrl={mediaUrl}
            createdAt={createdAt}
            content={tweet}
          />
        )
      )}
    </div>
  );
}
