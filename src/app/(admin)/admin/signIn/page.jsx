"use client";
import React, { useState, useEffect } from "react";
import { Lock, Mail, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { loginAdmin, verifyAuth } from "@/store/authSlice";

const ScriboraSignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(""); // Added loginError state
  const dispatch = useDispatch();
  const router = useRouter();
  const { admin, loading } = useSelector((state) => state.auth); // Check auth state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (admin) {
      console.log(
        "🔑 ScriboraSignIn: already authenticated, redirecting to /admin"
      );
      router.push("/admin");
    }
  }, [admin, router]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      console.log("🔑 ScriboraSignIn: attempting login with", formData.email);
      const loginResult = await dispatch(
        loginAdmin({
          email: formData.email,
          password: formData.password,
        })
      );

      if (loginAdmin.fulfilled.match(loginResult)) {
        console.log(
          "✓ ScriboraSignIn: login successful, admin:",
          loginResult.payload
        );
        // Verify auth to ensure Redux state is updated
        const verifyResult = await dispatch(verifyAuth());
        if (verifyAuth.fulfilled.match(verifyResult)) {
          console.log(
            "✓ ScriboraSignIn: verification successful, redirecting to /admin"
          );
          router.push("/admin");
        } else {
          console.warn(
            "✗ ScriboraSignIn: verification failed after login:",
            verifyResult.payload
          );
          setLoginError("Session verification failed. Please try again.");
        }
      } else {
        const errorMessage = loginResult.payload || "Invalid email or password";
        console.error("✗ ScriboraSignIn: login failed:", errorMessage);
        setLoginError(errorMessage);
      }
    } catch (err) {
      console.error("✗ ScriboraSignIn: unexpected error:", err.message);
      setLoginError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Sign In Container */}
      <div className="relative w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent mb-2">
            Scribora
          </h1>
          <p className="text-gray-400 text-lg">Admin Dashboard</p>
        </div>

        {/* Sign In Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900/50 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl p-8"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome back</h2>
            <p className="text-gray-400">Sign in to manage your blog content</p>
          </div>

          {/* General Error Message */}
          {loginError && (
            <div className="flex items-center gap-1 mb-6 text-red-400 text-sm">
              <AlertCircle size={14} />
              <span>{loginError}</span>
            </div>
          )}

          <div className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="text-gray-500" size={20} />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-gray-800 border ${
                    errors.email ? "border-red-500" : "border-gray-700"
                  } rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all`}
                  placeholder="admin@login.com"
                />
              </div>
              {errors.email && (
                <div className="flex items-center gap-1 mt-2 text-red-400 text-sm">
                  <AlertCircle size={14} />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="text-gray-500" size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full bg-gray-800 border ${
                    errors.password ? "border-red-500" : "border-gray-700"
                  } rounded-lg pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center gap-1 mt-2 text-red-400 text-sm">
                  <AlertCircle size={14} />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 bg-gray-800 border-gray-700 rounded focus:ring-2 focus:ring-indigo-500 text-indigo-600 cursor-pointer"
                />
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  Remember me
                </span>
              </label>
              <button
                type="button"
                className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading || loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading || loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>© 2024 Scribora. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default ScriboraSignIn;
