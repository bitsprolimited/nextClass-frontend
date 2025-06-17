import React from "react";

import ComingSoonWide from "@/components/landing/comingSoonWide";
import Footer from "@/components/footer";
import ParentSignup from "./parentSignup";

function Login() {
  return (
    <main className="min-h-screen flex flex-col items-center ">
      <ParentSignup />
      <ComingSoonWide />
      <Footer />
    </main>
  );
}

export default Login;
