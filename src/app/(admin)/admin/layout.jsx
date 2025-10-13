// ==================== 3. src/app/(admin)/admin/layout.js ====================

import "../../globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import ReduxProvider from "@/provider/ReduxProvider";
import AddPostModal from "@/components/AddPostModal";
import ProtectedRoute from "./ProtectedRoute";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Scribora Admin Dashboard",
  description: "Admin area for Scribora blog management",
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ReduxProvider>
            <ProtectedRoute>
              <AddPostModal />
              {children}
            </ProtectedRoute>
          </ReduxProvider>
        </div>
      </body>
    </html>
  );
}
