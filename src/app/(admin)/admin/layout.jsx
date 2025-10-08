import { SidebarProvider } from "@/components/ui/sidebar";
import "../../globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import AdminSideBar from "@/components/AdminSideBar";
import ReduxProvider from "@/provider/ReduxProvider";
import AddPostModal from "@/components/AddPostModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin area for the blog",
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ReduxProvider>
            <SidebarProvider>
              <AddPostModal />
              <AdminSideBar />
              <main>{children}</main>
            </SidebarProvider>
          </ReduxProvider>
        </div>
      </body>
    </html>
  );
}
