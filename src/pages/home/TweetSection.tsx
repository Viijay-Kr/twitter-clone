"use client";

import { useUser } from "@clerk/clerk-react";
import type { ChangeEventHandler } from "react";
import { useState } from "react";
import Avatar from "~/components/Avatar/Avatar";
import TextBox from "~/components/TextBox/TextBox";
import { FiImage } from "react-icons/fi";
import Button from "~/components/Button/Button";
import { api } from "~/utils/api";

export default function TweetSection() {
  const [tweet, setTweet] = useState<string>("");
  const createTweets = api.tweets.create.useMutation();

  const user = useUser();
  if (!user.isSignedIn) {
    return null;
  }

  const onTweetChange: ChangeEventHandler<HTMLTextAreaElement> = (evt) => {
    setTweet(evt.target.value);
  };

  const onTweetClick = () => {
    createTweets.mutate({
      content: tweet,
    });
  };

  return (
    <div className="flex gap-[0.5rem] border-b border-slate-800 px-[1rem] py-[0.5rem]">
      <div className="">
        <Avatar
          src={user.user.profileImageUrl}
          alt={user.user.username ?? "anonymous"}
        />
      </div>
      <div className="flex flex-grow basis-[90%] flex-col gap-[0.25rem]">
        <TextBox placeholder="What is happening ?" onChange={onTweetChange} />
        <div className="flex border-t border-slate-800 px-[1rem] pt-[1rem]">
          <FiImage
            className="cursor-pointer"
            title="media"
            color="#1d9bf0"
            size={18}
          />
          <Button
            onClick={onTweetClick}
            className="ml-auto w-[100px] py-[0.25rem]"
            variant="primary"
          >
            {createTweets.isLoading ? "Tweeting" : "Tweet"}
          </Button>
        </div>
      </div>
    </div>
  );
}
