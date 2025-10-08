"use client";
import { setCategory, setFilteredPosts, setIsOpen } from "@/store/contextSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HoverDropDown from "./HoverDropDown";
import { usePathname, useRouter } from "next/navigation";

export default function Nav() {
  const category = useSelector((state) => state.context.category);
  const allPost = useSelector((state) => state.context.AllPost);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (
      category &&
      category !== "" &&
      category !== "about" &&
      category !== "t&c" &&
      category !== "faq"
    ) {
      router.push("/");
    }
  }, [category, router]);

  // categories config
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

  return (
    <div className="mb-3 sm:mb-4 md:mb-10 border-b border-b-neutral-300 bg-white sticky top-0 z-[999] px-2 sm:px-3 md:px-0">
      <div className="relative">
        {/* ensures dropdowns can stack above */}
        <nav className="max-w-7xl mx-auto py-3 md:py-4 text-gray-600">
          <div
            style={{ scrollbarWidth: "none" }}
            className="flex items-center justify-start md:justify-between w-max md:w-full overflow-x-auto md:overflow-x-visible no-scrollbar"
          >
            {categories.map((cat, idx) =>
              cat.lists ? (
                <div
                  key={idx}
                  className="flex items-center justify-center gap-2"
                >
                  <HoverDropDown
                    label={cat.name}
                    onClick={(item) => {
                      const updated = allPost.filter((post) =>
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
                        : "px-3 sm:px-4 py-1.5 sm:py-2"
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
                      const updated = allPost.filter((post) =>
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
        </nav>
      </div>
    </div>
  );
}
