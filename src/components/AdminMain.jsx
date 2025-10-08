"use client";
import React, { useEffect } from "react";
import StatsCard from "./StatsCard";
import Image from "next/image";
import { Plus } from "lucide-react";
import { AdminBarChart } from "./AdminBarChart";
import { useDispatch, useSelector } from "react-redux";
import { loadPosts } from "@/utils/postThunks";
import { setShowAddModal } from "@/store/contextSlice";

export default function AdminMain() {
  const allPosts = useSelector((state) => state.context.AllPost);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);
  console.log(allPosts);

  return (
    <div className="">
      <div className="flex items-center justify-between mt-8">
        <h2 className="text-2xl font-bold">Hi, Welcome back 👋</h2>
        <button
          onClick={() => dispatch(setShowAddModal(true))}
          className="bg-black text-white px-5 py-2 rounded flex items-center font-semibold"
        >
          <Plus size={17} /> Add Post
        </button>
      </div>
      {/* cards */}
      <div className="flex justify-between gap-4 mb-8">
        {Array(4)
          .fill(null)
          .map((_, idx) => (
            <StatsCard key={idx} />
          ))}
      </div>

      {/*  */}
      <div className="flex items-start gap-4">
        {/* posts preview */}
        <div className="w-3/5 border border-neutral-400 shadow p-4 rounded-md bg-neutral-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h6 className="font-bold ">All Blog Posts</h6>
              <p className="font-medium text-sm text-neutral-600">
                1 post made this month
              </p>
            </div>
            <button className="bg-black text-white  rounded flex items-center font-medium text-sm px-4 py-1.5">
              {" "}
              View All Post
            </button>
          </div>

          {/* table */}
          <div className="mt-4">
            <table className="w-full text-left">
              <thead className="border-b border-neutral-300">
                <tr>
                  <th className="p-2">Image</th>
                  <th className="p-2">Title</th>
                  <th className="p-2">Country</th>
                  <th className="p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {/* map through posts */}
                {allPosts.map((post, idx) => (
                  <tr
                    key={post._id || idx} // Use _id for better React performance
                    className="border-b border-neutral-300 hover:bg-neutral-200"
                  >
                    <td className="p-2">
                      <div className="relative w-30 h-25">
                        {post.image ? (
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover object-center rounded"
                          />
                        ) : (
                          <div className="w-[120px] h-[100px] flex items-center justify-center bg-gray-200 text-gray-500 rounded">
                            No Image
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-2">{post.title}</td>
                    <td className="p-2">
                      {post.country ? post.country : "Not Specified"}
                    </td>
                    <td className="p-2">
                      {post.createdAt && !isNaN(new Date(post.createdAt))
                        ? new Date(post.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                        : "Date Not Available"}
                    </td>
                  </tr>
                ))}

                {/* static rows for design */}
                {/* <tr className="border-b border-neutral-300">
                  <td className="p-2">
                    <div className="relative w-30 h-25">
                      <Image
                        src="/nadzeya-matskevich-z90CJOaDoI4-unsplash.jpg"
                        alt="Title"
                        fill
                        className="object-cover object-center rounded"
                      />
                    </div>
                  </td>
                  <td className="p-2">
                    The Rise of Local News in Digital Media
                  </td>
                  <td className="p-2">Nigeria</td>
                  <td className="p-2">2023-10-01</td>
                </tr>
                <tr className="border-b border-neutral-300">
                  <td className="p-2">
                    <div className="relative w-30 h-25">
                      <Image
                        src="/nadzeya-matskevich-z90CJOaDoI4-unsplash.jpg"
                        alt="Title"
                        fill
                        className="object-cover object-center rounded"
                      />
                    </div>
                  </td>
                  <td className="p-2">
                    The Rise of Local News in Digital Media
                  </td>
                  <td className="p-2">Nigeria</td>
                  <td className="p-2">2023-10-01</td>
                </tr>
                <tr className="border-b border-neutral-300">
                  <td className="p-2">
                    <div className="relative w-30 h-25">
                      <Image
                        src="/nadzeya-matskevich-z90CJOaDoI4-unsplash.jpg"
                        alt="Title"
                        fill
                        className="object-cover object-center rounded"
                      />
                    </div>
                  </td>
                  <td className="p-2">
                    The Rise of Local News in Digital Media
                  </td>
                  <td className="p-2">Nigeria</td>
                  <td className="p-2">2023-10-01</td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
        {/* stats */}
        <div>
          <AdminBarChart />
        </div>
      </div>
    </div>
  );
}
