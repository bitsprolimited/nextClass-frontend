"use client";

import Footer from "@/components/footer";
import ComingSoonWide from "@/components/landing/comingSoonWide";
import TutorSignupForm from "./tutorSignupForm";
// import PasswordMeter from "./PasswordMeter";

function SignUp() {
  return (
    <main className="min-h-screen flex flex-col items-center ">
      {/* <PasswordMeter password={""} /> */}
      <TutorSignupForm />
      <ComingSoonWide />
      <Footer />
    </main>
  );
}

export default SignUp;
