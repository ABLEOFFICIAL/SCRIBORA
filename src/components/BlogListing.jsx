"use client";
import React, { useEffect } from "react";
import Blog from "./Blog";
import { useDispatch, useSelector } from "react-redux";
import { setAllPost } from "@/store/contextSlice";
import { loadPosts } from "@/utils/postThunks";
import PostNotFound from "./PostNotFound";
import Loading from "./Loading";

export default function BlogListing() {
  const { AllPost, isLoading, filteredPosts } = useSelector(
    (state) => state.context
  );
  const dispatch = useDispatch();
  console.log(AllPost);

  useEffect(() => {
    dispatch(loadPosts()); // fetch from DB when component mounts
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="pr-10 flex flex-col lg:border-r border-r-neutral-300 w-3/5 justify-center items-center h-[60vh]">
        <Loading />
      </div>
    );
  }

  // Choose which list to display
  let postsToShow =
    filteredPosts.length > 0
      ? filteredPosts
      : AllPost.length > 0
      ? AllPost
      : [];

  // ✅ Sort posts by latest (most recent first)
  postsToShow = [...postsToShow].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // ✅ If there are no posts, show fallback component
  // if (postsToShow.length === 0) {
  //   return (
  //     <div className="pr-10 flex flex-col border-r border-r-neutral-300 w-3/5 justify-center items-center">
  //       <PostNotFound />
  //     </div>
  //   );
  // }

  return (
    <div
      style={{ scrollbarWidth: "none" }}
      className="pr-10 flex flex-col md:border-r w-full lg:w-3/5 border-r-neutral-300 lg:max-h-full lg:overflow-y-auto"
    >
      {postsToShow.map((post, idx) => (
        <Blog key={idx} post={post} />
      ))}
    </div>
  );
}
