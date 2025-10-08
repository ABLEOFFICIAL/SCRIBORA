"use client";
import BlogListing from "@/components/BlogListing";
import Loading from "@/components/Loading";
import Nav from "@/components/Nav";
import SIdeBar from "@/components/SIdeBar";
import SideBarMobile from "@/components/SideBarMobile";
import React, { useContext } from "react";
import { useSelector } from "react-redux";

const page = () => {
  const { showMobileSideBar } = useSelector((state) => state.context);
  return (
    <div className=" min-h-screen pb-10 bg-neutral-50">
      <Nav />
      {showMobileSideBar && <SideBarMobile />}
      <div className="w-full md:w-7xl mx-auto ">
        <>
          {" "}
          <div className="flex z-0 justify-between gap-4 md:p-10 p-3 bg-white rounded-md shadow-md">
            <BlogListing />
            <SIdeBar />
          </div>
        </>
        {/* )} */}
      </div>
    </div>
  );
};

export default page;
