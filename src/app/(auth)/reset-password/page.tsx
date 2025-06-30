import ComingSoon from "@/components/comingSoon";
import Footer from "@/components/footer";
import HeroReset from "./heroReset";
import PasswordResetForm from "./passwordResetForm";

async function ResetPassword({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { token } = await searchParams;
  return (
    <main className="min-h-screen flex flex-col items-center ">
      <HeroReset />
      <PasswordResetForm token={token} />
      <ComingSoon />
      <Footer />
    </main>
  );
}

export default ResetPassword;
