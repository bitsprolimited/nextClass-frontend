import ComingSoon from "@/components/comingSoon";
import Footer from "@/components/footer";
import ParentSignupForm from "./parentSignup";

function Login() {
  return (
    <main className="min-h-screen flex flex-col items-center ">
      <ParentSignupForm />
      <ComingSoon />
      <Footer />
    </main>
  );
}

export default Login;
