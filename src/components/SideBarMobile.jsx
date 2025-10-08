"use client";
import {
  setCategory,
  setFilteredPosts,
  setShowMobileSideBar,
} from "@/store/contextSlice";
import { CircleChevronLeft } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Editions from "./Editions";
import HoverDropDown from "./HoverDropDown";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function SideBarMobile() {
  const categories = [
    { name: "All Categories" },
    { name: "News", lists: ["Local", "World", "International", "Politics"] },
    {
      name: "Lifestyle",
      lists: ["Fashion", "Beauty & Health", "Relationships", "Food & Travel"],
    },
    { name: "Entertainment", lists: ["Movies", "Music", "Celebrities"] },
    { name: "Business" },
    { name: "Courses", lists: ["Programming", "Design", "Marketing"] },
    { name: "Awards" },
    { name: "About", href: "/about" },
    { name: "Terms And Conditions", href: "/t&c" },
    { name: "FAQs", href: "/faq" },
  ];
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { AllPost, category } = useSelector((state) => state.context);
  return (
    <div className="fixed top-0 bottom-0 left-0 w-[60vw] py-5 px-8 bg-white z-[1999] md:hidden overflow-hidden">
      <CircleChevronLeft
        onClick={() => dispatch(setShowMobileSideBar(false))}
        className="text-neutral-500 absolute -right-5 top-5 p-3 size-12"
      />
      <div className="mt-20">
        <Editions colour="black" />
        <div className="flex flex-col w-full items-start mt-4 gap-5">
          {categories.map((cat, idx) =>
            cat.lists ? (
              <div key={idx} className="flex items-center justify-center gap-2">
                <HoverDropDown
                  label={cat.name}
                  onClick={(item) => {
                    const updated = AllPost.filter((post) =>
                      post.category.some(
                        (c) => c.toLowerCase() === item.toLowerCase()
                      )
                    );
                    dispatch(
                      setCategory(cat.name.toLowerCase().replace(/\s+/g, ""))
                    );
                    dispatch(setFilteredPosts(updated));
                  }}
                  className={`whitespace-nowrap ${
                    category === cat.name.toLowerCase().replace(/\s+/g, "")
                      ? "bg-neutral-500 text-white rounded-xl px-3 sm:px-4 py-1.5 sm:py-2"
                      : " py-1.5 sm:py-2"
                  }`}
                  items={cat.lists}
                />
              </div>
            ) : cat.href ? (
              <button
                key={idx}
                onClick={() => {
                  dispatch(setCategory(""));
                  dispatch(setFilteredPosts([]));
                  router.push(cat.href);
                }}
                className={`flex items-center gap-2 cursor-pointer whitespace-nowrap px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl ${
                  pathname === cat.href ? "bg-neutral-500 text-white" : ""
                }`}
              >
                {cat.name}
              </button>
            ) : (
              <button
                key={idx}
                onClick={() => {
                  if (cat.name === "All Categories") {
                    dispatch(setCategory("allcategories"));
                    dispatch(setFilteredPosts([]));
                  } else {
                    const updated = AllPost.filter((post) =>
                      post.category.some(
                        (c) => c.toLowerCase() === cat.name.toLowerCase()
                      )
                    );
                    dispatch(
                      setCategory(cat.name.toLowerCase().replace(/\s+/g, ""))
                    );
                    dispatch(setIsOpen(false));
                    dispatch(setFilteredPosts(updated));
                  }
                }}
                className={`flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                  category === cat.name.toLowerCase().replace(/\s+/g, "")
                    ? "bg-neutral-500 text-white rounded-xl px-3 sm:px-4 py-1.5 sm:py-2"
                    : "px-3 sm:px-4 py-1.5 sm:py-2"
                }`}
              >
                {cat.name}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
