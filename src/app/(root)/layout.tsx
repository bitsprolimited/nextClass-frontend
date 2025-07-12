import Footer from "@/components/footer";
import Header from "@/components/Header";
import { getSession } from "@/services/session";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <>
      <Header session={session} />
      {children}
      <Footer />
    </>
  );
}
