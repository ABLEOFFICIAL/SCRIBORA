"use client";
import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  FileText,
  User,
  Plus,
  TrendingUp,
  Eye,
  Calendar,
  MapPin,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  LogOut,
  Menu,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loadPosts } from "@/utils/postThunks";
import { setShowAddModal, setVisitorCount } from "@/store/contextSlice";
import DeleteModal from "./DeleteModal";
import { logoutAdmin } from "@/store/authSlice";
import Link from "next/link";
import BlogManagement from "./BlogManagement";

const ScriboraDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const postsPerPage = 6;
  const allBlogs = useSelector((state) => state.context.AllPost);
  const { visitorCount } = useSelector((state) => state.context);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  useEffect(() => {
    async function fetchVisitorCount() {
      try {
        const res = await fetch("/api/visitors");
        const data = await res.json();
        if (data.success) {
          dispatch(setVisitorCount(data.totalVisitors));
        }
      } catch (err) {
        console.error("Error fetching visitor count:", err);
      }
    }

    fetchVisitorCount();
  }, [dispatch]);

  const sortedBlogs = [...allBlogs].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const stats = [
    {
      title: "Published Blogs",
      value: allBlogs.length,
      icon: FileText,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Trending Posts",
      value: "4",
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Total Views",
      value: visitorCount,
      icon: Eye,
      color: "from-green-500 to-green-600",
    },
    {
      title: "This Month",
      value: "10",
      icon: Calendar,
      color: "from-orange-500 to-orange-600",
    },
  ];

  const recentBlogs = sortedBlogs.slice(0, 5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBlogs = sortedBlogs.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(sortedBlogs.length / postsPerPage);

  const NavButton = ({ icon: Icon, label, tabName }) => (
    <button
      onClick={() => {
        setActiveTab(tabName);
        if (tabName === "blogs") setCurrentPage(1);
        setSidebarOpen(false);
      }}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 w-full ${
        activeTab === tabName
          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
          : "text-gray-300 hover:bg-gray-800 hover:text-white"
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  const StatCard = ({ stat }) => (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-indigo-500 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium mb-1">{stat.title}</p>
          <p className="text-3xl font-bold text-white">{stat.value}</p>
        </div>
        <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-lg`}>
          <stat.icon className="text-white" size={24} />
        </div>
      </div>
    </div>
  );

  const BlogRow = ({ blog }) => (
    <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
      <td className="py-4 px-4">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-16 h-16 object-cover rounded-lg"
        />
      </td>
      <td className="py-4 px-4 text-gray-200 font-medium">{blog.title}</td>
      <td className="py-4 px-4 text-gray-400">
        <div className="flex items-center gap-2">
          <MapPin size={14} />
          {blog.country}
        </div>
      </td>
      <td className="py-4 px-4 text-gray-400">
        {blog.createdAt && !isNaN(new Date(blog.createdAt))
          ? new Date(blog.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : "Date Not Available"}
      </td>
    </tr>
  );

  const RecentBlogCard = ({ blog }) => (
    <div className="bg-gray-750 rounded-lg p-4 border border-gray-700 hover:border-indigo-500 transition-all">
      <div className="flex gap-4">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-medium mb-2 line-clamp-2">
            {blog.title}
          </h4>
          <div className="flex flex-col gap-1 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <MapPin size={12} />
              <span>{blog.country}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={12} />
              <span>
                {blog.createdAt && !isNaN(new Date(blog.createdAt))
                  ? new Date(blog.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  : "Date Not Available"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const BlogCard = ({ blog }) => (
    <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-indigo-500 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 group">
      <div className="relative overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium">
          {blog.status || "Published"}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2">
          {blog.title}
        </h3>
        <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <span>{blog.country}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>
              {blog.createdAt && !isNaN(new Date(blog.createdAt))
                ? new Date(blog.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                : "Date Not Available"}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-gray-400">
            <Eye size={14} />
            <span>{blog.views?.toLocaleString() || 0} views</span>
          </div>
          <BlogManagement blog={blog} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-900">
      {showDeleteModal && (
        <DeleteModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => dispatch(logoutAdmin())}
        />
      )}

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-950 border-r border-gray-800 p-6 flex flex-col transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Close button for mobile */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 lg:hidden text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <div className="mb-8">
          <Link href={"/"}>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent cursor-pointer">
              Scribora
            </h1>
          </Link>
          <p className="text-gray-500 text-sm mt-1">Admin Dashboard</p>
        </div>

        <nav className="space-y-2 flex-1">
          <NavButton
            icon={LayoutDashboard}
            label="Dashboard"
            tabName="dashboard"
          />
          <NavButton icon={FileText} label="Blogs" tabName="blogs" />
          <NavButton icon={User} label="Profile" tabName="profile" />
        </nav>
        <div>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="text-red-400 font-medium flex items-center gap-2 my-5 cursor-pointer hover:text-red-300 transition-colors"
          >
            <LogOut />
            Logout
          </button>
          <div className="pt-4 border-t border-gray-800">
            <p className="text-gray-500 text-xs">© 2024 Scribora</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto w-full">
        {/* Mobile Header */}
        <div className="lg:hidden bg-gray-950 border-b border-gray-800 p-4 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white hover:text-indigo-400 transition-colors"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Scribora
          </h1>
          <div className="w-6"></div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    Welcome back, Admin!
                  </h2>
                  <p className="text-gray-400 mt-1">
                    Here's what's happening with your blog today..
                  </p>
                </div>
                <button
                  onClick={() => dispatch(setShowAddModal(true))}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-indigo-500/50 transition-all w-full sm:w-auto justify-center"
                >
                  <Plus size={20} />
                  Add New Post
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((stat, index) => (
                  <StatCard key={index} stat={stat} />
                ))}
              </div>

              {/* Recent Blogs - Desktop Table / Mobile Cards */}
              <div className="bg-gray-800 rounded-xl border border-gray-700">
                <div className="p-4 sm:p-6 border-b border-gray-700 flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-semibold text-white">
                    Recent Blogs
                  </h3>
                  <button
                    onClick={() => setActiveTab("blogs")}
                    className="text-indigo-400 hover:text-indigo-300 font-medium text-sm flex items-center gap-1"
                  >
                    View All
                    <ChevronRight size={16} />
                  </button>
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-900">
                      <tr>
                        <th className="py-4 px-4 text-left text-gray-400 font-medium text-sm">
                          Image
                        </th>
                        <th className="py-4 px-4 text-left text-gray-400 font-medium text-sm">
                          Title
                        </th>
                        <th className="py-4 px-4 text-left text-gray-400 font-medium text-sm">
                          Country
                        </th>
                        <th className="py-4 px-4 text-left text-gray-400 font-medium text-sm">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentBlogs.map((blog, idx) => (
                        <BlogRow key={idx} blog={blog} />
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden p-4 space-y-3">
                  {recentBlogs.map((blog, idx) => (
                    <RecentBlogCard key={idx} blog={blog} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Blogs Tab */}
          {activeTab === "blogs" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    All Blogs
                  </h2>
                  <p className="text-gray-400 mt-1">
                    Manage and view all your blog posts
                  </p>
                </div>
                <button
                  onClick={() => dispatch(setShowAddModal(true))}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-indigo-500/50 transition-all w-full sm:w-auto justify-center"
                >
                  <Plus size={20} />
                  Add New Post
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search blogs..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Blog Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {currentBlogs.map((blog, idx) => (
                  <BlogCard key={idx} blog={blog} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-800 rounded-lg p-4 border border-gray-700 gap-4">
                <p className="text-gray-400 text-sm text-center sm:text-left">
                  Showing {indexOfFirstPost + 1} to{" "}
                  {Math.min(indexOfLastPost, sortedBlogs.length)} of{" "}
                  {sortedBlogs.length} blogs
                </p>
                <div className="flex items-center gap-2 flex-wrap justify-center">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="p-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        currentPage === i + 1
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Admin Profile
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
                    AS
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    Admin Scribora
                  </h3>
                  <p className="text-gray-400 mb-4">admin@scribora.com</p>
                  <button className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors w-full">
                    Edit Profile
                  </button>
                </div>

                {/* Information Card */}
                <div className="lg:col-span-2 bg-gray-800 rounded-xl border border-gray-700 p-6">
                  <h3 className="text-xl font-semibold text-white mb-6">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value="Admin Scribora"
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value="admin@scribora.com"
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">
                        Role
                      </label>
                      <input
                        type="text"
                        value="Administrator"
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">
                        Location
                      </label>
                      <input
                        type="text"
                        value="New York, USA"
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">
                        Member Since
                      </label>
                      <input
                        type="text"
                        value="January 2024"
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">
                        Total Posts
                      </label>
                      <input
                        type="text"
                        value={allBlogs.length}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Stats */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <h3 className="text-xl font-semibold text-white mb-6">
                  Activity Overview
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-400 mb-2">
                      {allBlogs.length}
                    </div>
                    <p className="text-gray-400">Total Posts</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">
                      {visitorCount}
                    </div>
                    <p className="text-gray-400">Total Views</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">
                      {(visitorCount / allBlogs?.length || 0).toFixed(1)}
                    </div>
                    <p className="text-gray-400">Avg. Views/Post</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ScriboraDashboard;
