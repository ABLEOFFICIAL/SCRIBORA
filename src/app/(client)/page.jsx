"use client";
import BlogListing from "@/components/BlogListing";
import Loading from "@/components/Loading";
import Nav from "@/components/Nav";
import SIdeBar from "@/components/SIdeBar";
import React from "react";

const page = () => {
  return (
    <div className=" min-h-screen overflow-hidden pb-10 bg-neutral-50">
      <Nav />
      {/* <div className=" "> */}{" "}
      <div className="flex w-full max-w-7xl mx-auto z-0 justify-between gap-4 md:p-10 p-3 bg-white rounded-md shadow-md">
        <BlogListing />
        <SIdeBar />
      </div>
      {/* </div> */}
    </div>
  );
};

export default page;
