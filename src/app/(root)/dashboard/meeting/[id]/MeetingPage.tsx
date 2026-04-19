"use client";

import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import "stream-chat-react/dist/css/v2/index.css";

import Loader from "@/components/Loader";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup, { Alert } from "@/components/MeetingSetup";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useAuth } from "@/providers/AuthProvider";
import {
  EventType,
  getBookingByMeetingLink,
  getMeetingAccess,
} from "@/services/booking.service";

const isClassCall = (custom: Record<string, unknown>, callType: string) => {
  return (
    custom.eventType === "class" ||
    custom.sessionType === "class" ||
    custom.meetingType === "class" ||
    callType === "class"
  );
};

const MeetingPage = ({ id }: { id: string }) => {
  const { call, isCallLoading } = useGetCallById(id);
  const { session, isLoading } = useAuth();
  const user = session?.user;
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { data: booking, isLoading: isBookingLoading } = useQuery({
    queryKey: ["meeting-booking", id],
    queryFn: () => getBookingByMeetingLink(id),
    enabled: !!user,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  const {
    data: meetingAccess,
    isLoading: isMeetingAccessLoading,
    refetch: refetchMeetingAccess,
  } = useQuery({
    queryKey: ["meeting-access", id],
    queryFn: () => getMeetingAccess(id),
    enabled: !!user,
    refetchInterval: isSetupComplete ? false : 15000,
    refetchOnWindowFocus: true,
    retry: 1,
  });

  if (isCallLoading || isLoading || isMeetingAccessLoading) return <Loader />;

  if (!call)
    return (
      <p className="text-center text-3xl font-bold text-white">
        Call Not Found
      </p>
    );

  // get more info about custom call type:  https://getstream.io/video/docs/react/guides/configuring-call-types/
  const notAllowed =
    call.type === "invited" &&
    (!user || !call.state.members.find((m) => m.user.id === user.id));

  if (notAllowed)
    return <Alert title="You are not allowed to join this meeting" />;

  if (meetingAccess && !meetingAccess.isEnrolled) {
    return <Alert title={meetingAccess.message} />;
  }

  if (meetingAccess?.isSessionEnded) {
    return (
      <Alert
        title={
          meetingAccess.sessionEndedReason === "time_expired"
            ? "This session has ended because the scheduled time expired."
            : meetingAccess.message
        }
      />
    );
  }

  const metadataClassSession = isClassCall(call.state.custom ?? {}, call.type);

  if (isBookingLoading && !metadataClassSession) return <Loader />;

  const isClassSession =
    booking?.eventType === EventType.CLASS || metadataClassSession;

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup
              user={user!}
              meetingId={id}
              meetingAccess={meetingAccess}
              refetchMeetingAccess={refetchMeetingAccess}
              setIsSetupComplete={setIsSetupComplete}
            />
          ) : (
            <MeetingRoom
              callId={id}
              isClassSession={isClassSession}
              meetingAccess={meetingAccess}
            />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default MeetingPage;
