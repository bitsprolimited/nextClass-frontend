import React from "react";

import ComingSoonWide from "@/components/landing/comingSoonWide";
import Footer from "@/components/footer";
import PasswordResetForm from "./passwordResetForm";
import HeroReset from "./heroReset";

function Login() {
  return (
    <main className="min-h-screen flex flex-col items-center ">
      <HeroReset />
      <PasswordResetForm />
      <ComingSoonWide />
      <Footer />
    </main>
  );
}

export default Login;
