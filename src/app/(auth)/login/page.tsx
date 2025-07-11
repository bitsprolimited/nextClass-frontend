import ComingSoon from "@/components/comingSoon";
import HeroLogin from "./heroSectionLogin";
import { LoginForm } from "./loginForm";

function Login() {
  return (
    <>
      <HeroLogin />
      <div className="flex justify-center items-center w-full py-10">
        <LoginForm />
      </div>
      <ComingSoon />
    </>
  );
}

export default Login;
