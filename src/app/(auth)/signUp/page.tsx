"use client";

import PasswordMeter from "@/components/auth/passwordMeter";
import Footer from "@/components/footer";
import TutorSignupForm from "./tutorSignupForm";
import ComingSoonWide from "@/components/landing/comingSoonWide";
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
