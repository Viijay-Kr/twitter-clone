"use client";

import { AiFillHeart, AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import Avatar from "../Avatar/Avatar";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import classNames from "classnames";

interface IProps {
  user: {
    profilePic: string;
    firstName: string | null;
    lastName: string | null;
    userName: string | null;
  };
  tweet: {
    content: string;
    mediaUrl?: string;
    createdAt: Date | null;
    isBookeMarked: boolean;
    isLiked: boolean;
    likesCount: number;
  };
  actions: {
    onRetweet?: () => void;
    onLikeToggle?: () => void;
    onBookMark: () => void;
  };
}
export default function TweetCard({ user, tweet, actions }: IProps) {
  return (
    <div className="flex flex-row gap-[0.5rem] border-b border-slate-800 px-[1rem] py-[0.5rem]">
      <Avatar src={user.profilePic} alt={user.userName ?? "anonymous"} />
      <div className="flex flex-col gap-[0.15rem]">
        <div className="flex flex-row items-baseline gap-[0.5rem]">
          <p className="text-lg font-semibold">{user.firstName}</p>
          <p className="text-md text-slate-400">@{user.userName}</p>
          {tweet.createdAt && (
            <p className="text-xs text-slate-400">
              {tweet.createdAt.toLocaleDateString("en-us", {
                day: "2-digit",
                hour: "numeric",
                month: "short",
              })}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-[0.25rem]">
          <p className="text">{tweet.content}</p>
          {tweet.mediaUrl && (
            <img
              src={tweet.mediaUrl}
              alt="uploaded media"
              className="w-[230px] rounded-lg object-contain"
            />
          )}
        </div>
        <div className="my-[0.5rem] flex cursor-pointer gap-[2.5rem]">
          <AiOutlineRetweet
            className="hover:fill-green-400"
            color="#71767b"
            size={18}
          />
          <button
            onClick={actions.onLikeToggle}
            className="flex flex-row items-center gap-[0.25rem]"
          >
            {tweet.isLiked ? (
              <AiFillHeart
                className="fill-pink-600 hover:fill-pink-400"
                size={18}
              />
            ) : (
              <AiOutlineHeart
                className="hover:fill-pink-600"
                color="#71767b"
                size={18}
              />
            )}
            {tweet.likesCount > 0 && (
              <span
                className={classNames("text-xs text-[#71767b]", {
                  ["text-pink-600"]: tweet.isLiked,
                })}
              >
                {tweet.likesCount}
              </span>
            )}
          </button>
          {tweet.isBookeMarked ? (
            <BsBookmarkFill
              className="fill-blue-500 hover:fill-blue-400"
              size={18}
            />
          ) : (
            <BsBookmark
              className="hover:fill-blue-500"
              color="#71767b"
              size={18}
              onClick={actions.onBookMark}
            />
          )}
        </div>
      </div>
    </div>
  );
}
