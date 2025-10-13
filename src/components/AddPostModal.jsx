"use client";
import { useState } from "react";
import React from "react";
import StatsCard from "./StatsCard";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AddPost, setShowAddModal } from "@/store/contextSlice";
import { createPost } from "@/utils/helper";

export default function AddPostModal() {
  const dispatch = useDispatch();
  const addPostModal = useSelector((state) => state.context.showAddModal);
  const categories = [
    "Local",
    "World",
    "International",
    "Politics",
    "Fashion",
    "Beauty & Health",
    "Relationships",
    "Food & Travel",
    "Movies",
    "Music",
    "Celebrities",
    "Business",
    "Programming",
    "Design",
    "Marketing",
  ];
  const tags = [
    "Local News",
    "Digital Media",
    "Community",
    "Breaking",
    "Sports",
    "Health",
    "Science",
    "Technology",
    "Education",
    "Culture",
  ];
  const countries = ["Nigeria", "USA", "UK", "Canada", "Germany"];

  const [post, setPost] = useState({
    title: "",
    slug: "",
    author: "",
    category: [],
    trending: false,
    country: "",
    tags: [],
    excerpt: "",
    image: null,
    readingTime: "",
    content: [],
  });

  const addContentBlock = (type) => {
    let newBlock = { type, subtitle: "", text: "" };
    if (type === "image") newBlock.image = null;
    if (type === "table") newBlock.table = "";
    setPost({ ...post, content: [...post.content, newBlock] });
  };

  const updateContentBlock = (index, field, value) => {
    const updated = [...post.content];
    updated[index][field] = value;
    setPost({ ...post, content: updated });
  };

  // Toggle multi-select (categories/tags)
  const toggleSelection = (field, value) => {
    setPost((prev) => {
      const exists = prev[field].includes(value);
      return {
        ...prev,
        [field]: exists
          ? prev[field].filter((v) => v !== value)
          : [...prev[field], value],
      };
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const postWithViews = { ...post, views: 0 }; // Ensure views: 0
      console.log("Post data to save:", postWithViews);
      const newPost = await createPost(postWithViews);
      if (!newPost) {
        throw new Error("Failed to create post");
      }
      console.log("Post created successfully:", newPost);
      dispatch(AddPost({ ...postWithViews, _id: newPost.insertedId }));
      dispatch(setShowAddModal(false));
      setPost({
        title: "",
        slug: "",
        author: "",
        category: [],
        trending: false,
        country: "",
        tags: [],
        excerpt: "",
        image: null,
        readingTime: "",
        content: [],
        views: 0, // Reset with views
      });
    } catch (err) {
      console.error("Failed to create post:", err);
      alert("Failed to create post. Check the console for details.");
    }
  };

  const handleImageUpload = async (file, field = "image", index = null) => {
    if (!file) {
      console.error("No file selected");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("Upload response:", data);
      if (data.url) {
        if (index !== null) {
          updateContentBlock(index, field, data.url); // Update content block image
          console.log("Updated content block:", post.content[index]); // Debug log
        } else {
          setPost((prev) => {
            const newState = { ...prev, image: data.url };
            console.log("Updated post state:", newState); // Debug log
            return newState;
          });
        }
      } else {
        console.error(
          "No URL returned from upload API:",
          data.error,
          data.details
        );
      }
    } catch (error) {
      console.error("Image upload failed:", error.message);
    }
  };

  return (
    addPostModal && (
      <div className="">
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <X
            onClick={() => dispatch(setShowAddModal(false))}
            className="bg-white size-7 rounded-full p-1 absolute top-1/6 right-1/4 m-4 cursor-pointer"
          />
          <div className="bg-white p-6 rounded-lg w-2/5 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Create Post</h2>

            {/* Title */}
            <input
              type="text"
              placeholder="Title"
              className="w-full p-2 border rounded mb-3"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
            />

            {/* Slug */}
            <input
              type="text"
              placeholder="Slug"
              className="w-full p-2 border rounded mb-3"
              value={post.slug}
              onChange={(e) => setPost({ ...post, slug: e.target.value })}
            />

            {/* Author */}
            <input
              type="text"
              placeholder="Author"
              className="w-full p-2 border rounded mb-3"
              value={post.author}
              onChange={(e) => setPost({ ...post, author: e.target.value })}
            />

            {/* Category (multi-select checkboxes) */}
            <div className="mb-3">
              <p className="font-medium mb-1">Category</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={post.category.includes(cat)}
                      onChange={() => toggleSelection("category", cat)}
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            {/* Tags (multi-select checkboxes) */}
            <div className="mb-3">
              <p className="font-medium mb-1">Tags</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <label key={tag} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={post.tags.includes(tag)}
                      onChange={() => toggleSelection("tags", tag)}
                    />
                    {tag}
                  </label>
                ))}
              </div>
            </div>

            {/* Country dropdown */}
            <select
              className="w-full p-2 border rounded mb-3"
              value={post.country}
              onChange={(e) => setPost({ ...post, country: e.target.value })}
            >
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {/* Trending select */}
            <select
              className="w-full p-2 border rounded mb-3"
              value={post.trending}
              onChange={(e) =>
                setPost({ ...post, trending: e.target.value === "true" })
              }
            >
              <option value="false">Not Trending</option>
              <option value="true">Trending</option>
            </select>

            {/* Excerpt */}
            <textarea
              placeholder="Excerpt"
              className="w-full p-2 border rounded mb-3"
              value={post.excerpt}
              onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
            />

            {/* Main image */}
            <input
              type="file"
              accept="image/*"
              className="w-full p-2 border rounded mb-3"
              onChange={(e) => handleImageUpload(e.target.files[0])}
            />

            {/* Reading Time */}
            <input
              type="text"
              placeholder="Reading Time (e.g. 6 min read)"
              className="w-full p-2 border rounded mb-3"
              value={post.readingTime}
              onChange={(e) =>
                setPost({ ...post, readingTime: e.target.value })
              }
            />

            {/* Content Blocks */}
            <div className="space-y-4 mt-6">
              {post.content.map((block, index) => (
                <div key={index} className="p-4 border rounded bg-gray-50">
                  <h4 className="font-semibold mb-2">Block {index + 1}</h4>
                  <input
                    type="text"
                    placeholder="Subtitle"
                    className="w-full p-2 border rounded mb-2"
                    value={block.subtitle}
                    onChange={(e) =>
                      updateContentBlock(index, "subtitle", e.target.value)
                    }
                  />
                  {block.type === "text" && (
                    <textarea
                      placeholder="Enter text..."
                      className="w-full p-2 border rounded"
                      value={block.text}
                      onChange={(e) =>
                        updateContentBlock(index, "text", e.target.value)
                      }
                    />
                  )}
                  {/* {block.type === "image" && (
                    <>
                      <textarea
                        placeholder="Enter text..."
                        className="w-full p-2 border rounded mb-2"
                        value={block.text}
                        onChange={(e) =>
                          updateContentBlock(index, "text", e.target.value)
                        }
                      />
                      <input
                        type="file"
                        accept="image/*"
                        className="w-full p-2 border rounded mb-3"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleImageUpload(e.target.files[0]);
                          } else {
                            console.error("No file selected");
                          }
                        }}
                      />
                    </>
                  )} */}
                  {block.type === "image" && (
                    <>
                      <textarea
                        placeholder="Enter text..."
                        className="w-full p-2 border rounded mb-2"
                        value={block.text}
                        onChange={(e) =>
                          updateContentBlock(index, "text", e.target.value)
                        }
                      />
                      <input
                        type="file"
                        accept="image/*"
                        className="w-full p-2 border rounded mb-3"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleImageUpload(
                              e.target.files[0],
                              "image",
                              index
                            ); // Pass index here
                          } else {
                            console.error("No file selected");
                          }
                        }}
                      />
                    </>
                  )}
                  {block.type === "table" && (
                    <textarea
                      placeholder="Paste table data (JSON/CSV)"
                      className="w-full p-2 border rounded"
                      value={block.table}
                      onChange={(e) =>
                        updateContentBlock(index, "table", e.target.value)
                      }
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Add Content Buttons */}
            <div className="flex gap-2 mt-4">
              <button
                type="button"
                onClick={() => addContentBlock("text")}
                className="px-2 py-1 bg-blue-500 text-white rounded font-semibold text-xs"
              >
                Add Text Block
              </button>
              <button
                type="button"
                onClick={() => addContentBlock("image")}
                className="px-2 py-1 bg-amber-500 text-white rounded font-semibold text-xs"
              >
                Add Image Block
              </button>
              <button
                type="button"
                onClick={() => addContentBlock("table")}
                className="px-2 py-1 bg-neutral-500 text-white rounded font-semibold text-xs"
              >
                Add Table Block
              </button>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              onClick={handleSave}
              className="mt-6 w-full bg-black text-white py-2 rounded"
            >
              Save Post
            </button>
          </div>
        </div>
        ;
      </div>
    )
  );
}
