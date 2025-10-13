"use client";
import React from "react";
import Card from "./Card";
import Newsletter from "./Newsletter";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setFilteredPosts } from "@/store/contextSlice";

export default function SideBar() {
  const dispatch = useDispatch();
  const allPost = useSelector((state) => state.context.AllPost);

  // ✅ Filter and sort trending posts by latest first
  const Trending = allPost
    .filter((post) => post.trending)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // latest first
    .slice(0, 4);

  return (
    <div className="w-2/5 flex-col gap-10 hidden lg:flex">
      {/* category buttons */}
      <div className="flex flex-wrap gap-2">
        {[
          "Local",
          "World",
          "International",
          "Politics",
          "Fashion",
          "Beauty & Health",
          "Relationships",
          "Food & Travel",
          "Movies",
          "Music",
          "Celebrities",
          "Business",
          "Programming",
          "Design",
          "Marketing",
        ].map((cat, idx) => (
          <button
            key={idx}
            onClick={() => {
              dispatch(setCategory(cat.toLowerCase().replace(/\s+/g, "")));
              const updated = allPost.filter((post) =>
                post.category.some((c) => c.toLowerCase() === cat.toLowerCase())
              );
              dispatch(setFilteredPosts(updated));
            }}
            className="text-blue-600 bg-blue-200 w-max px-2 py-1 rounded font-semibold text-sm cursor-pointer"
          >
            {cat}
          </button>
        ))}
      </div>
      {/* trending */}
      <div>
        <h2 className="text-3xl font-serif font-normal mb-5">Trending</h2>
        <div className="flex flex-col gap-3">
          {Trending.map((post, idx) => (
            <Card href={`/${post._id}`} key={idx}>
              <div>
                <div className="flex gap-2 mb-3 flex-wrap">
                  {post.category.map((cat, idx) => (
                    <span
                      key={idx}
                      className="text-blue-600 bg-blue-200 w-max px-2 py-1 rounded font-semibold text-xs"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-medium font-serif">{post.title}</h3>
              </div>
              <div className="w-40 h-32 flex-shrink-0">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover rounded"
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
      <Newsletter />
    </div>
  );
}
