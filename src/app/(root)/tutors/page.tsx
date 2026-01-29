import ComingSoon from "@/components/comingSoon";
import HeroSection from "@/components/tutors/hero-section";
import TutorList from "@/components/tutors/tutor-list";
import React from "react";

function Tutors() {
  return (
    <main>
      <HeroSection />
      <TutorList />
      <ComingSoon className="max-w-7xl mx-auto"/>
    </main>
  );
}

export default Tutors;
