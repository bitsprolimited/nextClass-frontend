import ComingSoon from "@/components/comingSoon";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <ComingSoon />
    </>
  );
}
