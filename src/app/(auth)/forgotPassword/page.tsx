import React from "react";

import ComingSoonWide from "@/components/landing/comingSoonWide";
import Footer from "@/components/footer";
import Header from "@/components/Header";

import ForgotPasswordForm from "./forgotPasswordForm";
import HeroForgot from "./heroForgot";

function Login() {
  return (
    <main className=" ">
      <Header />
      <HeroForgot />
      <ForgotPasswordForm />
      <ComingSoonWide />
      <Footer />
    </main>
  );
}

export default Login;
