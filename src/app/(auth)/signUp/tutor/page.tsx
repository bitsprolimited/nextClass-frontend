"use client";

import ComingSoon from "@/components/comingSoon";
import Footer from "@/components/footer";
import TutorSignupForm from "./tutorSignupForm";
// import PasswordMeter from "./PasswordMeter";

function SignUp() {
  return (
    <main className="min-h-screen flex flex-col items-center ">
      {/* <PasswordMeter password={""} /> */}
      <TutorSignupForm />
      <ComingSoon />
      <Footer />
    </main>
  );
}

export default SignUp;
