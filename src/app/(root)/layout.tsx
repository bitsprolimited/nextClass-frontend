import Footer from "@/components/footer";
import Header from "@/components/Header";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; 

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const cookie = headersList.get("cookie");

  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: {
        cookie: cookie || "",
      },
    },
  });

  return (
    <>
      <Header session={session} />
      {children}
      <Footer />
    </>
  );
}
