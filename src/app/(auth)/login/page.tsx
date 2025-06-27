import ComingSoon from "@/components/comingSoon";
import Footer from "@/components/footer";
import Header from "@/components/Header";
import HeroLogin from "./heroSectionLogin";
import { LoginForm } from "./loginForm";

function Login() {
  return (
    <main className="">
      <Header />
      <HeroLogin />
      <div className="flex justify-center items-center w-full py-10">
        <LoginForm />
      </div>
      <ComingSoon />
      <Footer />
    </main>
  );
}

export default Login;
