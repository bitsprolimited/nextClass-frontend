import TutorProfile from "./tutor-profile";

export default async function TutorProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <main className="flex flex-col items-center w-full">
      <TutorProfile id={id} />
    </main>
  );
}
