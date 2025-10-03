import React from "react";
import MeetingPage from "./MeetingPage";
import { getSession } from "@/services/session";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession();
  return <MeetingPage user={session?.user} id={id} />;
}

export default page;
