"use client";
import {
  setCategory,
  setFilteredPosts,
  setShowMobileSideBar,
} from "@/store/contextSlice";
import { CircleChevronLeft } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Editions from "./Editions";
import HoverDropDown from "./HoverDropDown";
import { useRouter, usePathname } from "next/navigation";

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
    { name: "About", href: "/about" },
    { name: "Terms And Conditions", href: "/t&c" },
    { name: "FAQs", href: "/faq" },
  ];

  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { AllPost, category, showMobileSideBar } = useSelector(
    (state) => state.context
  );

  const sidebarRef = useRef(null);

  // ✅ Close sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      const target = e.target;

      // 🛑 Ignore clicks inside sidebar
      if (sidebarRef.current && sidebarRef.current.contains(target)) return;

      // 🛑 Ignore clicks inside Radix popper content or elements marked as sidebar-related
      if (
        target.closest("[data-radix-select-content]") ||
        target.closest("[data-radix-popper-content-wrapper]") ||
        target.closest("[data-sidebar-element]")
      )
        return;

      // ✅ Otherwise, close sidebar
      dispatch(setShowMobileSideBar(false));
    }

    if (showMobileSideBar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMobileSideBar, dispatch]);

  return (
    showMobileSideBar && (
      <div
        ref={sidebarRef}
        className="fixed top-0 bottom-0 left-0 w-[60vw] p-5 overflow-hidden bg-white z-[1999] md:hidden min-h-screen shadow-lg"
      >
        <CircleChevronLeft
          onClick={() => dispatch(setShowMobileSideBar(false))}
          className="text-neutral-500 absolute -right-5 top-5 p-3 size-12 cursor-pointer"
        />
        <div className="mt-20">
          <Editions
            className="flex-col items-start gap-2"
            colour="black"
            dropDownClass="w-full"
          />
          <div className="flex flex-col w-full items-start mt-4 gap-2">
            {categories.map((cat, idx) =>
              cat.lists ? (
                <div
                  key={idx}
                  className="flex items-center justify-center gap-2"
                >
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
                      dispatch(setShowMobileSideBar(false)); // close on select
                    }}
                    className={`whitespace-nowrap ${
                      category === cat.name.toLowerCase().replace(/\s+/g, "")
                        ? "bg-neutral-500 text-white rounded-xl px-3 sm:px-4 py-1.5 sm:py-2"
                        : "py-1.5 sm:py-2"
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
                    dispatch(setShowMobileSideBar(false)); // close on link click
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
                      dispatch(setFilteredPosts(updated));
                    }
                    dispatch(setShowMobileSideBar(false)); // close after click
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
    )
  );
}
