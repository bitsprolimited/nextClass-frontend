import { getSession } from "@/services/session";
import TutorProfile from "./tutor-profile";

export default async function TutorProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession();
  return (
    <main className="flex flex-col items-center w-full">
      <TutorProfile session={session} id={id} />
    </main>
  );
}
