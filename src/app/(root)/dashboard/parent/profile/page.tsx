"use client";

import HowItWorksSection from "@/components/landing/how-it-works";
import { Profile } from "./Profile";

const page = () => {
  return (
    <main className=" ">
      <Profile />
      <HowItWorksSection />
    </main>
  );
};

export default page;
