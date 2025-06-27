import React from "react";

import ComingSoonWide from "@/components/landing/comingSoonWide";
import Footer from "@/components/footer";

import Dashboard from "./Dashboard";
import Header from "@/components/Header";

function Page() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center ">
      <div className="w-[80%]">
        <Dashboard />
      </div>
    </main>
  );
}

export default Page;
