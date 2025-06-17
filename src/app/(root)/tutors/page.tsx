import ComingSoon from "@/components/comingSoon";
import HeroSection from "@/components/tutors/hero-section";
import TutorList from "@/components/tutors/tutor-list";
import React from "react";

function Tutors() {
  return (
    <main>
      <HeroSection />
      <TutorList />
      <ComingSoon />
    </main>
  );
}

export default Tutors;
