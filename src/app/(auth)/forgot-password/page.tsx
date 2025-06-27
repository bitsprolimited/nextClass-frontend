
import Footer from "@/components/footer";
import Header from "@/components/Header";

import ComingSoon from "@/components/comingSoon";
import ForgotPasswordForm from "./forgotPasswordForm";
import HeroForgot from "./heroForgot";

function Login() {
  return (
    <main>
      <Header />
      <HeroForgot />
      <ForgotPasswordForm />
      <ComingSoon />
      <Footer />
    </main>
  );
}

export default Login;
