"use client";
import { setCategory, setFilteredPosts, setIsOpen } from "@/store/contextSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HoverDropDown from "./HoverDropDown";
import { usePathname, useRouter } from "next/navigation";

export default function Nav() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const category = useSelector((state) => state.context.category);
  const allPost = useSelector((state) => state.context.AllPost);
  const selectedCountry = useSelector((state) => state.context.selectedCountry);

  // ✅ Navigate to home when a category is selected
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

  const categories = [
    { name: "All Categories" },
    { name: "News", lists: ["Local", "World", "International", "Politics"] },
    {
      name: "Lifestyle",
      lists: ["Fashion", "Beauty", "Health", "Relationships", "Food & Travel"],
    },
    { name: "Entertainment", lists: ["Movies", "Music", "Celebrities"] },
    { name: "Business" },
    { name: "Courses", lists: ["Programming", "Design", "Marketing"] },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact-us" },
    { name: "Terms And Conditions", href: "/t&c" },
    { name: "FAQs", href: "/faq" },
  ];

  // ✅ Helper function to apply both filters
  const filterPosts = (allPosts, categoryName) => {
    let updated = allPosts;

    // filter by country first
    if (selectedCountry && selectedCountry !== "all") {
      updated = updated.filter(
        (post) => post.country?.toLowerCase() === selectedCountry.toLowerCase()
      );
    }

    // then by category (if not allcategories)
    if (categoryName && categoryName !== "allcategories") {
      updated = updated.filter((post) =>
        post.category.some(
          (c) => c.toLowerCase() === categoryName.toLowerCase()
        )
      );
    }

    return updated;
  };

  return (
    <div
      style={{ scrollbarWidth: "none" }}
      className="mb-3 sm:mb-4 md:mb-10 border-b border-b-neutral-300 bg-white sticky top-0 px-4 sm:px-6 md:px-10 z-[2000] overflow-auto lg:overflow-visible"
    >
      <div className="relative z-[2000]">
        <nav
          style={{ scrollbarWidth: "none" }}
          className="max-w-7xl mx-auto py-3 md:py-4 text-gray-600"
        >
          <div
            style={{ scrollbarWidth: "none" }}
            className="flex items-center font-semibold lg:font-normal text-sm lg:text-base justify-start md:justify-between w-max md:w-full no-scrollbar snap-x snap-mandatory"
          >
            {categories.map((cat, idx) =>
              cat.lists ? (
                <div
                  key={idx}
                  className="flex items-center relative justify-center gap-2 snap-center"
                >
                  <HoverDropDown
                    label={cat.name}
                    onClick={(item) => {
                      const categoryName = cat.name
                        .toLowerCase()
                        .replace(/\s+/g, "");
                      const updated = filterPosts(allPost, item);

                      dispatch(setCategory(categoryName));
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
                  className={`flex items-center gap-2 cursor-pointer whitespace-nowrap px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl snap-center ${
                    pathname === cat.href ? "bg-neutral-500 text-white" : ""
                  }`}
                >
                  {cat.name}
                </button>
              ) : (
                <button
                  key={idx}
                  onClick={() => {
                    const categoryName = cat.name
                      .toLowerCase()
                      .replace(/\s+/g, "");

                    if (cat.name === "All Categories") {
                      dispatch(setCategory("allcategories"));
                      // show all (respecting current country)
                      const updated = filterPosts(allPost, "allcategories");
                      dispatch(setFilteredPosts(updated));
                    } else {
                      const updated = filterPosts(allPost, cat.name);
                      dispatch(setCategory(categoryName));
                      dispatch(setIsOpen(false));
                      dispatch(setFilteredPosts(updated));
                    }
                  }}
                  className={`flex items-center gap-2 cursor-pointer whitespace-nowrap snap-center ${
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
