"use client";

import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import "stream-chat-react/dist/css/v2/index.css";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { useState } from "react";

import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup, { Alert } from "@/components/MeetingSetup";
import { useGetCallById } from "@/hooks/useGetCallById";
import { User } from "@/types";
import Loader from "@/components/Loader";

const MeetingPage = ({ user, id }: { user: User | undefined; id: string }) => {
  const { call, isCallLoading } = useGetCallById(id);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  if (isCallLoading) return <Loader />;

  if (!call)
    return (
      <p className="text-center text-3xl font-bold text-white">
        Call Not Found
      </p>
    );

  // get more info about custom call type:  https://getstream.io/video/docs/react/guides/configuring-call-types/
  const notAllowed =
    call.type === "invited" &&
    (!user || !call.state.members.find((m) => m.user.id === user._id));

  if (notAllowed)
    return <Alert title="You are not allowed to join this meeting" />;

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup user={user} setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom callId={id} />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default MeetingPage;
