import TweetCard from "~/components/TweetCard/TweetCard";
import { api } from "~/utils/api";

export default function AllTweets(props: { from: "For you" | "Following" }) {
  const tweets = api.tweets.getFirstTen.useQuery();
  return (
    <div className="flex flex-col gap-[1rem] ">
      {tweets.data?.map(
        ({ tweet, name, userName, lastName, id, profilePicture }) => (
          <TweetCard
            key={id}
            user={{
              firstName: name,
              lastName,
              userName,
              profilePic: profilePicture,
            }}
            content={tweet}
          />
        )
      )}
    </div>
  );
}
