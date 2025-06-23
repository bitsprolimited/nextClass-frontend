"use client";

import React from "react";
import Dashboard from "./Dashboard";
import Footer from "@/components/footer";
import ComingSoonWide from "@/components/landing/comingSoonWide";
import Header from "@/components/Header";
import HowItWorksSection from "@/components/landing/how-it-works";

const page = () => {
  return (
    <main className=" ">
      <Header />
      <Dashboard />
      <HowItWorksSection />
      <ComingSoonWide />
      <Footer />
    </main>
  );
};

export default page;
