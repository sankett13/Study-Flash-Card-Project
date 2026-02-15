import React from "react";
import Navbar from "@/components/shared/open/Navbar";
import Footer from "@/components/shared/open/Footer";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="">{children}</div>
      <Footer />
    </div>
  );
}
