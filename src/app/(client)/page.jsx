"use client";
import BlogListing from "@/components/BlogListing";
import Nav from "@/components/Nav";
import SIdeBar from "@/components/SIdeBar";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVisitorCount } from "@/store/contextSlice"; // ✅ <-- You forgot this import

const Page = () => {
  const dispatch = useDispatch();
  const { visitorCount } = useSelector((state) => state.context);

  useEffect(() => {
    async function trackVisitor() {
      try {
        const res = await fetch("/api/visitors", { method: "POST" });
        const data = await res.json();
        console.log("Visitor tracking response:", data);
        console.log(data.success);

        if (data.success) {
          dispatch(setVisitorCount(data.totalVisitors)); // ✅ store count in Redux
        }
      } catch (err) {
        console.error("Visitor tracking failed:", err);
      }
    }

    trackVisitor();
  }, [dispatch]); // ✅ include dispatch in dependency array
  console.log("Visitor Count from Redux:", visitorCount);

  return (
    <div className="min-h-screen pb-10 bg-neutral-50">
      <Nav />
      <div className="flex w-full max-w-7xl max-h-[150vh] mx-auto justify-between gap-4 md:p-10 p-3 bg-white rounded-md shadow-md">
        <BlogListing />
        <SIdeBar />
      </div>
    </div>
  );
};

export default Page;
