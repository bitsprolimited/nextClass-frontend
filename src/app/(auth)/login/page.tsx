import ComingSoon from "@/components/comingSoon";
import HeroLogin from "./heroSectionLogin";
import { LoginForm } from "./loginForm";
import { Suspense } from "react";
import Loader from "@/components/Loader";

function Login() {
  console.log(process.env.NEXT_PUBLIC_API_BASE_URL);
  console.log(process.env.BETTER_AUTH_URL);
  return (
    <>
      <HeroLogin />
      <div className="flex justify-center items-center w-full py-10">
        <Suspense fallback={<Loader />}>
          <LoginForm />
        </Suspense>
      </div>
      <ComingSoon />
    </>
  );
}

export default Login;
