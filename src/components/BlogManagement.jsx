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
} from "lucide-react";
import { useDispatch } from "react-redux";
import { setShowAddModal, setEditPost, removePost } from "@/store/contextSlice";
import { deletePost as deletePostAPI } from "@/utils/helper";

// View Blog Modal Component
const ViewBlogModal = ({ blog, onClose, onEdit, onDelete }) => {
  if (!blog) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="relative">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div
          className="p-6 overflow-y-auto max-h-[calc(90vh-16rem)]"
          style={{ scrollbarWidth: "thin" }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {blog.title}
          </h1>

          <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>
                {blog.createdAt && !isNaN(new Date(blog.createdAt))
                  ? new Date(blog.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })
                  : "Date Not Available"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{blog.country}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{blog.readingTime || "5 min read"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye size={16} />
              <span>{blog.views?.toLocaleString() || 0} views</span>
            </div>
          </div>

          {blog.category && blog.category.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Tag size={16} />
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {blog.category.map((cat, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          )}

          {blog.tags && blog.tags.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {blog.excerpt && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Excerpt</h3>
              <p className="text-gray-700 italic">{blog.excerpt}</p>
            </div>
          )}

          {blog.content && blog.content.length > 0 && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-900 text-xl">Content</h3>
              {blog.content.map((block, idx) => (
                <div key={idx} className="space-y-3">
                  {block.subtitle && (
                    <h4 className="text-xl font-semibold text-gray-800">
                      {block.subtitle}
                    </h4>
                  )}
                  {block.text && (
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {block.text}
                    </p>
                  )}
                  {block.image && (
                    <img
                      src={block.image}
                      alt={block.subtitle || "Content image"}
                      className="w-full rounded-lg shadow-md"
                    />
                  )}
                  {block.table && (
                    <div className="overflow-x-auto">
                      <pre className="bg-gray-100 p-4 rounded-lg text-sm">
                        {block.table}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 p-4 flex gap-3 justify-end bg-gray-50">
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
