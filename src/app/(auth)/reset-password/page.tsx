import ComingSoon from "@/components/comingSoon";
import Footer from "@/components/footer";
import HeroReset from "./heroReset";
import PasswordResetForm from "./passwordResetForm";

function Login() {
  return (
    <main className="min-h-screen flex flex-col items-center ">
      <HeroReset />
      <PasswordResetForm />
      <ComingSoon />
      <Footer />
    </main>
  );
}

export default Login;
