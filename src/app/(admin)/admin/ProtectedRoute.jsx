// app/admin/ProtectedRoute.jsx
"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyAuth } from "@/store/authSlice";
import { useRouter, usePathname } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { admin, loading, error } = useSelector((state) => state.auth);
  const [checked, setChecked] = useState(false);

  // Run verification on mount
  useEffect(() => {
    console.log(
      "🔐 ProtectedRoute: starting verification, pathname:",
      pathname
    );
    if (pathname === "/admin/signIn") {
      console.log("🔐 ProtectedRoute: skipping verification for sign-in page");
      setChecked(true);
      return;
    }

    dispatch(verifyAuth())
      .unwrap()
      .then(() => {
        console.log("🔐 ProtectedRoute: verification succeeded");
      })
      .catch((err) => {
        console.warn("🔐 ProtectedRoute: verification failed:", err);
        if (pathname !== "/admin/signIn") {
          console.log("🔐 ProtectedRoute: redirecting to /admin/signIn");
          router.replace("/admin/signIn");
        }
      })
      .finally(() => {
        console.log(
          "🔐 ProtectedRoute: verification complete, setting checked=true"
        );
        setChecked(true);
      });
  }, [dispatch, pathname, router]);

  // Handle redirect after verification
  useEffect(() => {
    console.log(
      "🔐 ProtectedRoute: redirect check, checked:",
      checked,
      "loading:",
      loading,
      "admin:",
      !!admin,
      "pathname:",
      pathname
    );
    if (!checked || loading) return;

    if (!admin && pathname !== "/admin/signIn") {
      console.log("✗ ProtectedRoute: not authenticated, redirecting...");
      router.replace("/admin/signIn");
    }

    if (admin && pathname === "/admin/signIn") {
      console.log(
        "✓ ProtectedRoute: authenticated, redirecting to dashboard..."
      );
      router.replace("/admin");
    }
  }, [checked, loading, admin, pathname, router]);

  // While verifying, show loader
  if (!checked || loading) {
    console.log(
      "🔐 ProtectedRoute: rendering spinner, checked:",
      checked,
      "loading:",
      loading
    );
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Allow authenticated users or sign-in page
  if (pathname === "/admin/signIn" || admin) {
    console.log(
      "✓ ProtectedRoute: rendering children, authenticated as",
      admin?.email || "Sign-in page"
    );
    return <>{children}</>;
  }

  console.log("🔐 ProtectedRoute: rendering null during redirect");
  return null;
}
