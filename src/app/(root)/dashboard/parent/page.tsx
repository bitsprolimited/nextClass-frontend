"use client";

import HowItWorksSection from "@/components/landing/how-it-works";
import Dashboard from "./Dashboard";

const page = () => {
  return (
    <main className=" ">
      <Dashboard />
      <HowItWorksSection />
    </main>
  );
};

export default page;
