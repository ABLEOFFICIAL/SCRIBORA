"use client";
import { useEffect, useState } from "react";
import React from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddPost,
  setShowAddModal,
  setEditPost,
  updatePostInStore,
} from "@/store/contextSlice";
import { createPost, updatePost } from "@/utils/helper";

export default function AddPostModal() {
  const dispatch = useDispatch();
  const addPostModal = useSelector((state) => state.context.showAddModal);
  const editPost = useSelector((state) => state.context.editPost);

  const categories = [
    "Local",
    "World",
    "International",
    "Politics",
    "Fashion",
    "Beauty",
    "Health",
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

  // Load edit post data when modal opens
  useEffect(() => {
    if (addPostModal && editPost) {
      setPost(editPost);
    } else if (!addPostModal) {
      // Reset form when modal closes
      resetForm();
    }
  }, [addPostModal, editPost]);

  const resetForm = () => {
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
    });
    dispatch(setEditPost(null));
  };

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
      const isEditing = !!editPost;

      if (isEditing) {
        // UPDATE existing post
        console.log("Updating post:", post);
        const result = await updatePost(post._id, post);

        if (!result) {
          throw new Error("Failed to update post");
        }

        console.log("Post updated successfully");
        dispatch(updatePostInStore(post));
        alert("Post updated successfully!");
      } else {
        // CREATE new post
        const postWithViews = { ...post, views: 0 };
        console.log("Creating new post:", postWithViews);
        const newPost = await createPost(postWithViews);

        if (!newPost) {
          throw new Error("Failed to create post");
        }

        console.log("Post created successfully:", newPost);
        dispatch(AddPost({ ...postWithViews, _id: newPost.insertedId }));
        alert("Post created successfully!");
      }

      dispatch(setShowAddModal(false));
      resetForm();
    } catch (err) {
      console.error("Failed to save post:", err);
      alert(
        `Failed to ${
          editPost ? "update" : "create"
        } post. Check the console for details.`
      );
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
          updateContentBlock(index, field, data.url);
        } else {
          setPost((prev) => ({ ...prev, image: data.url }));
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

  const handleClose = () => {
    dispatch(setShowAddModal(false));
    resetForm();
  };

  return (
    addPostModal && (
      <div className="">
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-2 sm:px-4">
          <X
            onClick={handleClose}
            className="bg-white size-7 rounded-full p-1 absolute top-4 right-4 sm:top-8 sm:right-10 m-2 cursor-pointer hover:bg-gray-200 transition-colors"
          />
          <div
            style={{ scrollbarWidth: "none" }}
            className="bg-white p-5 sm:p-6 rounded-lg w-full sm:w-4/5 md:w-3/5 lg:w-2/5 max-h-[85vh] overflow-y-auto"
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center sm:text-left">
              {editPost ? "Edit Post" : "Create Post"}
            </h2>

            {/* Title */}
            <input
              type="text"
              placeholder="Title"
              className="w-full p-2 border rounded mb-3 text-sm sm:text-base"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
            />

            {/* Slug */}
            <input
              type="text"
              placeholder="Slug"
              className="w-full p-2 border rounded mb-3 text-sm sm:text-base"
              value={post.slug}
              onChange={(e) => setPost({ ...post, slug: e.target.value })}
            />

            {/* Author */}
            <input
              type="text"
              placeholder="Author"
              className="w-full p-2 border rounded mb-3 text-sm sm:text-base"
              value={post.author}
              onChange={(e) => setPost({ ...post, author: e.target.value })}
            />

            {/* Category */}
            <div className="mb-3">
              <p className="font-medium mb-1 text-sm sm:text-base">Category</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-1 text-sm">
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

            {/* Tags */}
            <div className="mb-3">
              <p className="font-medium mb-1 text-sm sm:text-base">Tags</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <label key={tag} className="flex items-center gap-1 text-sm">
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

            {/* Country */}
            <select
              className="w-full p-2 border rounded mb-3 text-sm sm:text-base"
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

            {/* Trending */}
            <select
              className="w-full p-2 border rounded mb-3 text-sm sm:text-base"
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
              className="w-full p-2 border rounded mb-3 text-sm sm:text-base"
              value={post.excerpt}
              onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
            />

            {/* Main image */}
            <div className="mb-3">
              {post.image && (
                <div className="mb-2 relative">
                  <img
                    src={post.image}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => setPost({ ...post, image: null })}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                    title="Remove image"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="w-full p-2 border rounded text-sm sm:text-base"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    handleImageUpload(e.target.files[0]);
                  }
                }}
              />
            </div>

            {/* Reading Time */}
            <input
              type="text"
              placeholder="Reading Time (e.g. 6 min read)"
              className="w-full p-2 border rounded mb-3 text-sm sm:text-base"
              value={post.readingTime}
              onChange={(e) =>
                setPost({ ...post, readingTime: e.target.value })
              }
            />

            {/* Content Blocks */}
            <div className="space-y-4 mt-6">
              {post.content.map((block, index) => (
                <div
                  key={index}
                  className="p-3 sm:p-4 border rounded bg-gray-50"
                >
                  <h4 className="font-semibold mb-2 text-sm sm:text-base">
                    Block {index + 1}
                  </h4>
                  <input
                    type="text"
                    placeholder="Subtitle"
                    className="w-full p-2 border rounded mb-2 text-sm sm:text-base"
                    value={block.subtitle}
                    onChange={(e) =>
                      updateContentBlock(index, "subtitle", e.target.value)
                    }
                  />
                  {block.type === "text" && (
                    <textarea
                      placeholder="Enter text..."
                      className="w-full p-2 border rounded text-sm sm:text-base"
                      value={block.text}
                      onChange={(e) =>
                        updateContentBlock(index, "text", e.target.value)
                      }
                    />
                  )}
                  {block.type === "image" && (
                    <>
                      <textarea
                        placeholder="Enter text..."
                        className="w-full p-2 border rounded mb-2 text-sm sm:text-base"
                        value={block.text}
                        onChange={(e) =>
                          updateContentBlock(index, "text", e.target.value)
                        }
                      />
                      {block.image && (
                        <div className="relative mb-2">
                          <img
                            src={block.image}
                            alt="Block"
                            className="w-full h-32 object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              updateContentBlock(index, "image", null)
                            }
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                            title="Remove image"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="w-full p-2 border rounded mb-3 text-sm sm:text-base"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleImageUpload(
                              e.target.files[0],
                              "image",
                              index
                            );
                          }
                        }}
                      />
                    </>
                  )}
                  {block.type === "table" && (
                    <textarea
                      placeholder="Paste table data (JSON/CSV)"
                      className="w-full p-2 border rounded text-sm sm:text-base"
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
            <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
              <button
                type="button"
                onClick={() => addContentBlock("text")}
                className="px-3 py-1 bg-blue-500 text-white rounded font-semibold text-xs sm:text-sm hover:bg-blue-600 transition-colors"
              >
                Add Text Block
              </button>
              <button
                type="button"
                onClick={() => addContentBlock("image")}
                className="px-3 py-1 bg-amber-500 text-white rounded font-semibold text-xs sm:text-sm hover:bg-amber-600 transition-colors"
              >
                Add Image Block
              </button>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              onClick={handleSave}
              className="mt-6 w-full bg-black text-white py-2 rounded text-sm sm:text-base hover:bg-gray-800 transition-colors"
            >
              {editPost ? "Update Post" : "Save Post"}
            </button>
          </div>
        </div>
      </div>
    )
  );
}
