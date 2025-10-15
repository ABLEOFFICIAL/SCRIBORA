"use client";
import React, { useState } from "react";
import {
  Eye,
  Edit2,
  Trash2,
  X,
  Calendar,
  MapPin,
  Tag,
  User,
  Clock,
  ChevronRight,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { setShowAddModal, setEditPost, removePost } from "@/store/contextSlice";
import { deletePost as deletePostAPI } from "@/utils/helper";
import Link from "next/link";

// View Blog Modal Component - Admin Version (Simplified)
const ViewBlogModal = ({ blog, onClose, onEdit, onDelete }) => {
  if (!blog) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white p-2 rounded-full transition-colors shadow-lg"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div
          className="overflow-y-auto max-h-[90vh]"
          style={{ scrollbarWidth: "thin" }}
        >
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
            {/* Breadcrumb */}
            <div className="pt-10">
              <span className="font-semibold text-blue-500 flex flex-wrap items-center gap-2 py-3 sm:py-5 border-b border-b-neutral-200 text-sm sm:text-base">
                <span className="hover:underline cursor-pointer">Home</span>
                <ChevronRight className="size-3 text-neutral-600" />
                {blog.category && blog.category[0]
                  ? blog.category[0]
                  : "General"}
              </span>

              {/* Title Section */}
              <div className="py-3 sm:py-5 border-b border-b-neutral-200">
                <h2 className="font-medium font-serif text-2xl sm:text-4xl leading-snug">
                  {blog.title}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 font-normal py-2 sm:py-3">
                  Posted on{" "}
                  {blog.createdAt && !isNaN(new Date(blog.createdAt))
                    ? new Date(blog.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                    : "Date Not Available"}{" "}
                  by {blog.author}
                </p>
              </div>

              {/* Excerpt & Main Image */}
              <div className="py-4 sm:py-5 border-b border-b-neutral-200 flex flex-col gap-3">
                <p className="font-semibold text-base sm:text-lg leading-relaxed">
                  {blog.excerpt}
                </p>
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-56 sm:h-[60vh] object-cover object-center rounded"
                />
              </div>

              {/* Author & Country Info */}
              <div className="py-4 sm:py-5 border-b border-b-neutral-200 flex flex-wrap items-center gap-2 text-sm">
                <User className="bg-neutral-300 rounded-full p-1 size-8" />
                <span className="text-sm text-neutral-800 font-semibold">
                  {blog.author}
                </span>
                <span className="h-6 w-px bg-neutral-300"></span>
                <span className="text-sm text-neutral-800 font-semibold">
                  {blog.country}
                </span>
                <span className="h-6 w-px bg-neutral-300"></span>
                <span className="text-sm text-neutral-600">
                  <Clock size={14} className="inline mr-1" />
                  {blog.readingTime || "5 min read"}
                </span>
              </div>

              {/* Categories & Tags */}
              {((blog.category && blog.category.length > 0) ||
                (blog.tags && blog.tags.length > 0)) && (
                <div className="py-4 border-b border-b-neutral-200 flex flex-wrap gap-4">
                  {blog.category && blog.category.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm flex items-center gap-2">
                        <Tag size={14} />
                        Categories
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {blog.category.map((cat, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {blog.tags && blog.tags.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                        Tags
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {blog.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Content Blocks */}
              <div className="pt-6 sm:pt-10 flex flex-col gap-8 sm:gap-10 pb-10">
                {blog.content &&
                  blog.content.map((paragraph, idx) => (
                    <div key={idx} className="flex flex-col gap-4 sm:gap-6">
                      {paragraph.subtitle && (
                        <h2 className="font-medium font-serif text-2xl sm:text-3xl">
                          {paragraph.subtitle}
                        </h2>
                      )}
                      {paragraph.text && (
                        <p className="text-gray-800 text-base sm:text-lg leading-7 whitespace-pre-wrap">
                          {paragraph.text}
                        </p>
                      )}
                      {paragraph.image && (
                        <img
                          src={paragraph.image}
                          alt={paragraph.subtitle || "Content image"}
                          className="w-full h-56 sm:h-[60vh] object-cover object-center rounded"
                        />
                      )}
                      {paragraph.table && (
                        <div className="overflow-x-auto">
                          <pre className="bg-gray-100 p-4 rounded-lg text-sm">
                            {paragraph.table}
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Footer Actions - Sticky */}
          <div className="sticky bottom-0 border-t border-gray-200 p-4 flex gap-3 justify-end bg-white shadow-lg">
            <button
              onClick={onEdit}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Edit2 size={16} />
              Edit
            </button>
            <button
              onClick={onDelete}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Delete Confirmation Modal
const DeleteConfirmModal = ({ blog, onClose, onConfirm, isDeleting }) => {
  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-red-100 p-3 rounded-full">
            <Trash2 className="text-red-600" size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Delete Blog Post</h3>
        </div>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete "
          <span className="font-semibold">{blog?.title}</span>"? This action
          cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Blog Management Component
const BlogManagement = ({ blog }) => {
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();

  const handleView = () => {
    setSelectedBlog(blog);
    setShowViewModal(true);
  };

  const handleEdit = () => {
    setShowViewModal(false);
    dispatch(setEditPost(blog));
    dispatch(setShowAddModal(true));
  };

  const handleDeleteClick = () => {
    setSelectedBlog(blog);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      const result = await deletePostAPI(selectedBlog._id);

      if (result && result.deletedCount > 0) {
        dispatch(removePost(selectedBlog._id));
        setShowDeleteModal(false);
        setShowViewModal(false);
        setSelectedBlog(null);
        alert("Blog post deleted successfully!");
      } else {
        throw new Error("Failed to delete blog post");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog post. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={handleView}
          className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
          title="View"
        >
          <Eye size={18} />
        </button>
        <button
          onClick={handleEdit}
          className="p-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors"
          title="Edit"
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={handleDeleteClick}
          className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
          title="Delete"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {showViewModal && (
        <ViewBlogModal
          blog={selectedBlog}
          onClose={() => {
            setShowViewModal(false);
            setSelectedBlog(null);
          }}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmModal
          blog={selectedBlog}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedBlog(null);
          }}
          onConfirm={handleDeleteConfirm}
          isDeleting={isDeleting}
        />
      )}
    </>
  );
};

export default BlogManagement;
