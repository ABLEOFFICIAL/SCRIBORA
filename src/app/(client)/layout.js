import { Geist, Geist_Mono } from "next/font/google";
import "../../app/globals.css";
import ReduxProvider from "@/provider/ReduxProvider";
import Header from "@/components/Header";
import SideBarMobile from "@/components/SideBarMobile";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Scribora",
  description: "...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <Header />
          <SideBarMobile />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
