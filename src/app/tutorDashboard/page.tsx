import React from "react";

import ComingSoonWide from "@/components/landing/comingSoonWide";
import Footer from "@/components/footer";

import Dashboard from "./Dashboard";

function Login() {
  return (
    <main className="min-h-screen flex flex-col items-center ">
      <Dashboard />

      <ComingSoonWide />
      <Footer />
    </main>
  );
}

export default Login;
