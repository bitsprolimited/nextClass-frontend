import ComingSoon from "@/components/comingSoon";
import { StreamVideoClientProvider } from "@/providers/StreamVideoClientProvider";
import { getSession } from "@/services/session";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <StreamVideoClientProvider session={session}>
        {children}
        <ComingSoon />
      </StreamVideoClientProvider>
    </>
  );
}
