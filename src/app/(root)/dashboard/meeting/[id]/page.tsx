import MeetingPage from "./MeetingPage";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <MeetingPage id={id} />;
}

export default page;
