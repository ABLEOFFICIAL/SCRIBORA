"use client";
import React, { use, useEffect } from "react";
import Logo from "./Logo";
import Input from "./Input";
import { ChevronLeft, Edit, Menu, Search } from "lucide-react";
import Editions from "./Editions";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilteredPosts,
  setSearch,
  setSearchMobile,
  setShowMobileSideBar,
  setShowSearchBar,
} from "@/store/contextSlice";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const route = useRouter();
  const pathName = usePathname();
  const { AllPost, showSearchBar, search, searchMobile } = useSelector(
    (state) => state.context
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setShowSearchBar(false));
  }, [pathName]);
  return (
    <>
      {!showSearchBar ? (
        <div className="bg-blue-400 h-16 sm:h-20 md:h-24 px-4 sm:px-6 md:px-10 flex justify-center items-center">
          <div className="w-full max-w-7xl mx-auto flex justify-between items-center">
            {/* Left: Logo & Menu */}
            <div className="flex items-center gap-2">
              <Menu
                onClick={() => dispatch(setShowMobileSideBar(true))}
                className="w-6 h-6 text-white md:hidden"
              />
              <Logo />
            </div>

            {/* Middle: Search (hidden on mobile) */}
            <div className="hidden md:flex items-center space-x-4 z-[1000]">
              <Editions />
              <div className="relative w-60 lg:w-72">
                <Input
                  value={search}
                  onChange={(e) => {
                    const value = e.target.value;
                    route.push("/");
                    dispatch(setSearch(value));

                    const searchedPost = AllPost.filter((post) =>
                      post.title.toLowerCase().includes(value.toLowerCase())
                    );
                    dispatch(setFilteredPosts(searchedPost));
                  }}
                  placeholder="Search blogs..."
                  name="search"
                  className="px-10 bg-white w-full"
                />
                <div className="absolute left-0 top-0 h-full w-10 flex items-center justify-center text-gray-500">
                  <Search />
                </div>
              </div>
            </div>

            {/* Right: Mobile search icon */}
            <Search
              onClick={() => dispatch(setShowSearchBar(true))}
              className="text-white w-7 h-7 md:hidden block"
            />
          </div>
        </div>
      ) : (
        <div className=" h-16 sm:h-20 md:h-24 px-4 sm:px-6 md:px-10 flex items-center justify-center md:hidden ">
          <div className="flex items-center gap-4 w-full">
            <ChevronLeft onClick={() => dispatch(setShowSearchBar(false))} />
            <div className="relative w-full lg:w-72">
              <Input
                value={searchMobile}
                onChange={(e) => {
                  const value = e.target.value;
                  route.push("/");
                  dispatch(setSearchMobile(value));

                  const searchedPost = AllPost.filter((post) =>
                    post.title.toLowerCase().includes(value.toLowerCase())
                  );
                  dispatch(setFilteredPosts(searchedPost));
                }}
                placeholder="Search blogs..."
                name="search"
                className="px-10 bg-white w-full"
              />
              <div className="absolute left-0 top-0 h-full w-10 flex items-center justify-center text-gray-500">
                <Search />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
