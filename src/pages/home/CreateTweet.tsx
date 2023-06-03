"use client";

import { useUser } from "@clerk/clerk-react";
import type { ChangeEventHandler } from "react";
import { useState, useRef } from "react";
import Avatar from "~/components/Avatar/Avatar";
import TextBox from "~/components/TextBox/TextBox";
import Button from "~/components/Button/Button";
import { api } from "~/utils/api";
import { UploadMedia } from "~/components/UploadMedia/UploadMedia";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";

export default function CreateTweet() {
  const [tweet, setTweet] = useState<string>("");
  const tweetBoxRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();
  const tweetsKey = getQueryKey(api.tweets.getFirstTen, undefined, "query");
  const createTweets = api.tweets.create.useMutation({
    onSuccess: async () => {
      if (tweetBoxRef.current) {
        tweetBoxRef.current.value = "";
      }
      await queryClient.refetchQueries(tweetsKey);
      setTweet("");
      setActiveMedia("");
    },
  });
  const [activeMedia, setActiveMedia] = useState<string>();
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
      mediaUrl: activeMedia,
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
        <TextBox
          ref={tweetBoxRef}
          placeholder="What is happening ?"
          onChange={onTweetChange}
        />
        {activeMedia && <img src={activeMedia} alt="uploaded media" />}
        <div className="flex border-t border-slate-800 px-[1rem] pt-[1rem]">
          <UploadMedia
            onUploadComplete={(url) => {
              setActiveMedia(url);
            }}
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
