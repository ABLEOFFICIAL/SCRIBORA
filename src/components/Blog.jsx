import { Clock11, Link as LinkIcon, MessageCircle, User } from "lucide-react";
import React from "react";
import Link from "next/link";

export default function Blog({ post }) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    <div className="py-5 flex items-start gap-5 lg:items-center lg:gap-4 border-b border-b-neutral-300">
      <div className="w-[2/5]">
        <div className="w-36 lg:w-60 lg:h-48 xl:w-72 h-24 xl:h-60 ">
          <Link href={`/${post._id}`}>
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover  rounded"
            />
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="flex gap-2">
          {post.category.map((cat, idx) => (
            <p
              key={idx}
              className="bg-amber-500 text-[10px] md:text-xs px-1 md:px-2 py-0 md:py-0.5 rounded text-white inline"
            >
              {cat}
            </p>
          ))}
        </span>
        <Link href={`/${post._id}`}>
          <h2 className="text-base lg:text-3xl font-medium font-serif w-full">
            {post.title}
          </h2>
        </Link>
        <div className="lg:flex items-center gap-2 hidden">
          <p className="text-gray-600 font-semibold text-sm flex items-center gap-1 ">
            <User className="bg-neutral-300 rounded-full p-1 " /> {post.author}
          </p>
          <p className="text-gray-600 font-semibold text-sm flex items-center gap-1 ">
            <Clock11 className="text-neutral-600 size-4" />{" "}
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <Link href={`/${post._id}#comments`}>
            <p className="text-gray-600 font-semibold text-sm hidden xl:flex items-center gap-1 ">
              <MessageCircle className="text-neutral-600 size-4" /> Leave a
              comment
            </p>
          </Link>
        </div>
        <p className="text-gray-800 text-sm w-4/5 hidden lg:block">
          {post.excerpt.substring(0, 150)}...
        </p>
        <Link
          href={`/${post._id}`}
          className="text-blue-600 text-xs bg-blue-200 w-max px-1 lg:px-2 py-0.5 lg:py-1 rounded font-semibold lg:text-sm flex items-center gap-1 "
        >
          Continue Reading <LinkIcon className="size-3" />
        </Link>
      </div>
    </div>
  );
}
