import ComingSoon from "@/components/comingSoon";
import { StreamVideoClientProvider } from "@/providers/StreamVideoClientProvider";

export const runtime = "nodejs"; // ensure cookie access
export const dynamic = "force-dynamic"; // prevent cache

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StreamVideoClientProvider>
      <main className="min-h-screen">
        {children}
        <ComingSoon />
      </main>
    </StreamVideoClientProvider>
  );
}
