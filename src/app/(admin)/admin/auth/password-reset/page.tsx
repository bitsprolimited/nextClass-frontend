import PasswordReset from "./PasswordResetForm";

async function ResetPassword({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { token } = await searchParams;
  return (
    <main className="min-h-screen flex flex-col items-center ">
      <PasswordReset token={token} />
    </main>
  );
}

export default ResetPassword;
